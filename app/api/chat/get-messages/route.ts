import { db } from "@/lib/database/index";
import { messages as chatMessages } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chat-id");

  if (chatId) {
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.chatId, chatId))
      .orderBy(chatMessages.id);

    return Response.json({ messages });
  }
}
