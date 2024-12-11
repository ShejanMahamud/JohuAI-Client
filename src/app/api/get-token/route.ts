import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const cookies = req.headers.get("cookie") || "";
  const token = cookies
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  if (token) {
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
