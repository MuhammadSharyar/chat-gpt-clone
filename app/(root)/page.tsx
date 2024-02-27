"use client";

import React from "react";
import { Textarea } from "@nextui-org/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { BsUpload } from "react-icons/bs";
import { createChat, getChatMessages, getChats } from "@/lib/helper-functions";
import { ChatContext } from "@/context/ChatContext";

const Home = () => {
  const {
    setChats,
    selectedChat,
    setSelectedChat,
    setSingleChatLoading,
    setChatMessages,
  } = React.useContext(ChatContext)!;
  var chatId = null;

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: `/api/chat?chat-id=${selectedChat?.id}`,
    });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedChat) {
      setSingleChatLoading(true);
      const newChat = await createChat(input);
      setSelectedChat(newChat);
      const chats = await getChats();
      setChats(chats);
      chatId = newChat.id;
      setSingleChatLoading(false);
    }
    handleSubmit(e);
  };

  React.useEffect(() => {
    if (selectedChat) {
      getChatMessages({ id: selectedChat.id }).then((messages) =>
        setMessages(messages)
      );
    }
  }, [selectedChat]);

  return (
    <main className="h-[85vh] w-full flex justify-center items-center p-4">
      <div className="relative max-w-5xl w-full flex flex-col justify-center items-center h-screen">
        {!selectedChat ? (
          <h2 className="font-bold text-lg">How can I help you today?</h2>
        ) : (
          <ul className="flex flex-col gap-y-2 overflow-y-scroll no-scrollbar pt-24 pb-28">
            {messages.map((m) => (
              <li
                key={m.id}
                className={cn(
                  "flex w-full",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.role === "user" ? (
                  <p className="text-sm bg-blue-400 dark:bg-blue-600 lg:w-[60%] rounded-sm p-2 ml-4 lg:m-0 whitespace-pre-line w-full">
                    {m.content}
                  </p>
                ) : (
                  <p className="text-sm bg-secondary lg:w-[60%] rounded-sm p-2 mr-4 lg:m-0 whitespace-pre-line w-full">
                    {m.content}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
        <form
          className="absolute w-full flex justify-center bottom-0 bg-background pb-7 pt-2"
          onSubmit={handleFormSubmit}
        >
          <Textarea
            variant="bordered"
            value={input}
            placeholder="Message Chat GPT ..."
            minRows={2}
            className="w-[80%] lg:w-[60%]"
            onChange={handleInputChange}
            endContent={
              <Button size="icon" type="submit">
                <BsUpload size={15} />
              </Button>
            }
          />
        </form>
      </div>
    </main>
  );
};

export default Home;
