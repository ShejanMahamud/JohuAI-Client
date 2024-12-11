import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loggedInUser = async () => {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("accessToken");
  if (!accessTokenCookie) {
    throw new Error("User not authenticated.");
  }
  const accessToken = accessTokenCookie.value;

  const decodedToken = jwtDecode(accessToken) as { id: string };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/${decodedToken.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("An error occurred while getting the user.");
  }

  return await response.json();
};
