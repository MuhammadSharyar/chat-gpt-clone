"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { BsStars } from "react-icons/bs";
import { PiDotsThreeVertical } from "react-icons/pi";
import { BiEditAlt } from "react-icons/bi";
import { ChatContext } from "@/context/ChatContext";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { getChats } from "@/lib/helper-functions";

const Sidebar = () => {
  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    chatsLoading,
    setChatsLoading,
    singleChatLoading,
  } = React.useContext(ChatContext)!;

  React.useEffect(() => {
    setChatsLoading(true);
    getChats().then((chats) => setChats(chats));
    setChatsLoading(false);
  }, []);

  return (
    <aside className="p-4 flex flex-col justify-between h-screen">
      <div>
        <Button
          size="sm"
          className="flex justify-between items-center w-full mb-4"
          onClick={() => setSelectedChat(undefined)}
        >
          New Chat
          <BiEditAlt size={15} />
        </Button>
        <ul className="h-[75vh] overflow-y-scroll no-scrollbar">
          {singleChatLoading ? (
            <li key="loading">
              <Skeleton className="h-7 mb-1" />
            </li>
          ) : null}
          {chatsLoading ? (
            <ChatsSkeleton />
          ) : chats ? (
            chats!.map((chat, i) => (
              <li key={i}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedChat(chat)}
                  className={cn(
                    "w-full mb-1 flex justify-between",
                    chat.id === selectedChat?.id ? "bg-secondary" : ""
                  )}
                >
                  <p className="truncate">{chat.chatName}</p>
                  <PiDotsThreeVertical size={15} />
                </Button>
              </li>
            ))
          ) : null}
        </ul>
      </div>
      <Button
        size="sm"
        variant="secondary"
        className="w-full flex justify-between items-center"
      >
        Upgrade Plan
        <BsStars size={15} />
      </Button>
    </aside>
  );
};

export default Sidebar;
function ChatsSkeleton() {
  return (
    <ul>
      {Array.from({ length: 3 }).map((item, i) => (
        <Skeleton className="h-7 mb-1" />
      ))}
    </ul>
  );
}
