import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "token"
    )?.value;

  if (token) {
    const decoded =
      verifyToken(token);

    console.log(
      "Authenticated User:",
      decoded
    );
  }

  return NextResponse.next();
}