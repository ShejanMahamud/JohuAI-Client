interface SignInUserInput {
  email: string;
  password: string;
}

export const signInUser = async (input: SignInUserInput) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  return await response.json();
};
