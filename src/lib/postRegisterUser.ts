interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
  profile_picture: string;
}

export const registerUser = async (input: RegisterUserInput) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!response.ok) {
    throw new Error("An error occurred while registering the user.");
  }

  return await response.json();
};
