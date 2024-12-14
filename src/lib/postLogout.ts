export const logOut = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const res = await data.json();
  return res;
};
