import OpenAI from "openai";
import { db } from "@/lib/database";
import { cookies } from "next/headers";
import { decodeToken } from "@/lib/access-token";
import { chats } from "@/lib/database/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const token = cookies().get("accessToken")!.value;
    const user = await decodeToken({ token });

    if (!user)
      return Response.json({ error: "not authorized" }, { status: 400 });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: false,
      temperature: 0.4,
      messages: [
        {
          role: "user",
          content: `Generate a short title based on the given prompt ${prompt} the title should not be more than 40 characters and should be friendly and professional. Do not try to answer the prompt just give a title based on the context.`,
        },
      ],
    });

    const chatName = response.choices[0].message.content?.replaceAll('"', "");

    const newChat = await db
      .insert(chats)
      .values({
        userId: user.id,
        chatName: chatName as string,
      })
      .returning();

    return Response.json(
      { message: "request successful", chat: newChat[0] },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "request failed", error }, { status: 500 });
  }
}
