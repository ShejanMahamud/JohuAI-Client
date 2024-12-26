export const sendOtp = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/auth/send-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  return await response.json();
};
