export const getUserDetails = async () => {
  try {
    const res = await fetch("/api/get-user-details").then((res) => res.json());
    return res.user;
  } catch (error) {
    return null;
  }
};

export const createChat = async (prompt: string) => {
  const res = await fetch("/api/create-chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json());
  console.log("NEW CHAT:::" + JSON.stringify(res));
  return res.chat;
};

export const getChats = async () => {
  const res = await fetch("/api/get-chats").then((res) => res.json());
  return res.chats;
};

export const getChatMessages = async ({ id }: { id: string }) => {
  const res = await fetch(`/api/chat/get-messages?chat-id=${id}`).then((res) =>
    res.json()
  );
  return res.messages;
};

export const signOut = async () => {
  try {
    await fetch("/api/auth/sign-out");
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
