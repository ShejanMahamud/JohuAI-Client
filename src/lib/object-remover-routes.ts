export const sendObjectRemoverPrompt = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/tools/object-remover`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
};
