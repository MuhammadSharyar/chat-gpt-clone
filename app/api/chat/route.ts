import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { db } from "@/lib/database";
import { chats } from "@/lib/database/schema";
import { messages as messageTable } from "@/lib/database/schema";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { searchParams } = new URL(req.url);

  const chatId = searchParams.get("chat-id");

  console.log("CHAT ID:::" + chatId);

  if (!chatId)
    return Response.json(
      { error: "chat-id is missing in params" },
      { status: 404 }
    );

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      const prompt = messages[messages.length - 1];
      await db
        .insert(messageTable)
        .values({ chatId, role: "user", content: prompt.content });
    },
    onCompletion: async (completion: string) => {
      await db
        .insert(messageTable)
        .values({ chatId, role: "assistant", content: completion });
    },
  });
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
