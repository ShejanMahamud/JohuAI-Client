interface conversationMeta {
  user: string;
  prompt: string;
  conversationId?: string;
  model: string;
  tone: string;
  language: string;
  botId: string;
}

export const getAiAssistantConversation = async (
  userId: string,
  conversationId: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/ai-assistant/conversation?userId=${userId}&conversationId=${conversationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
};
export const getAiAssistantConversations = async (
  userId: string,
  title: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/ai-assistant/conversations?userId=${userId}&title=${title}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
};

export const sendAiAssistantPrompt = async (
  conversationMeta: conversationMeta
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/ai-assistant/send-prompt`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...conversationMeta,
      }),
    }
  );
  const data = await res.json();
  return data;
};

export const deleteAiAssistantConversation = async (conversationId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/ai-assistant/conversation?conversationId=${conversationId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
};

export const updateAiAssistantConversation = async (
  conversationId: string,
  updatedBody: {
    title: string;
  }
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/ai-assistant/conversation?conversationId=${conversationId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedBody),
    }
  );
  const data = await res.json();
  return data;
};
