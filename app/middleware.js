import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const url = req.nextUrl.pathname;

  if (url.startsWith("/api/auth")) return NextResponse.next();

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ success: false, error: "Token required", code: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (url.startsWith("/api/users") && decoded.role !== "admin") {
      return NextResponse.json({ success: false, error: "Forbidden", code: 403 });
    }

    return NextResponse.next();

  } catch (err) {
    return NextResponse.json({ success: false, error: "Unauthorized", code: 401 });
  }
}

export const config = {
  matcher: ["/api/items/:path*", "/api/users/:path*"]
};
