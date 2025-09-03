import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value;
    if (!token) return NextResponse.json({ session: null });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string")
      return NextResponse.json({ session: null });
    const payload = decoded as JwtPayload;
    if (!payload.sub || !payload.email)
      return NextResponse.json({ session: null });
    const userId =
      typeof payload.sub === "string"
        ? Number(payload.sub)
        : (payload.sub as number);
    return NextResponse.json({
      session: { user: { id: userId, email: payload.email as string } },
    });
  } catch {
    return NextResponse.json({ session: null });
  }
}
