"use client";

import React from "react";

type ChatContextProps = {
  chats: ChatProps[] | undefined;
  setChats: React.Dispatch<React.SetStateAction<ChatProps[] | undefined>>;
  selectedChat: ChatProps | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatProps | undefined>>;
  chatMessages: MessageProps | undefined;
  setChatMessages: React.Dispatch<
    React.SetStateAction<MessageProps | undefined>
  >;
  chatsLoading: boolean;
  setChatsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  singleChatLoading: boolean;
  setSingleChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type ChatProps = {
  id: string;
  chatName: string;
};

type MessageProps = {
  id: string;
  role: string;
  content: string;
};

export const ChatContext = React.createContext<ChatContextProps | undefined>(
  undefined
);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = React.useState<ChatProps[]>();
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>();
  const [chatMessages, setChatMessages] = React.useState<MessageProps>();
  const [chatsLoading, setChatsLoading] = React.useState(false);
  const [singleChatLoading, setSingleChatLoading] = React.useState(false);
  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        chatMessages,
        setChatMessages,
        chatsLoading,
        setChatsLoading,
        singleChatLoading,
        setSingleChatLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
