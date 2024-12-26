export const sendSketchToImagePrompt = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/tools/sketch-to-image`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
};
