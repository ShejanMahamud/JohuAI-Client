export const verifyOtp = async (email: string, otp: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    }
  );
  return await response.json();
};
