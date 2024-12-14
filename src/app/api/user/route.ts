import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    ) as {
      id: string;
    };

    const loggedInUser = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/api/user/${decodedToken.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await loggedInUser.json();
    return NextResponse.json({ ...data });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Invalid token" },
      { status: 401 }
    );
  }
}
