import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Optional: fake admin login for local testing
    if (
      process.env.ALLOW_FAKE_ADMIN === "true" &&
      email === process.env.FAKE_ADMIN_EMAIL &&
      password === process.env.FAKE_ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ sub: -1, email }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const res = NextResponse.json({ user: { id: -1, email } });
      res.cookies.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    const { rows } = await query<{
      id: number;
      email: string;
      password_hash: string;
    }>("SELECT id, email, password_hash FROM users WHERE email = $1", [email]);

    const user = rows[0];
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({ user: { id: user.id, email: user.email } });
    res.cookies.set("session", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Internal error" },
      { status: 500 }
    );
  }
}
