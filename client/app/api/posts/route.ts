import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const offset = (page - 1) * pageSize;

  const clauses: string[] = [];
  const params: any[] = [];

  if (category) {
    params.push(category);
    clauses.push(`category = $${params.length}`);
  }
  if (search) {
    params.push(`%${search}%`);
    const idx = params.length;
    clauses.push(`(title ILIKE $${idx} OR summary ILIKE $${idx})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const { rows } = await query<any>(
    `SELECT * FROM posts ${where} ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${offset}`,
    params
  );
  const countRes = await query<{ count: string }>(
    `SELECT COUNT(*)::int as count FROM posts ${where}`,
    params
  );
  return NextResponse.json({ data: rows, count: countRes.rows[0]?.count || 0 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, summary, blocks, category, date } = body;
  if (!title || !category || !blocks) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const { rows } = await query<any>(
    `INSERT INTO posts (title, summary, blocks, category, date, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [
      title,
      summary || "",
      JSON.stringify(blocks),
      category,
      date || new Date().toISOString(),
    ]
  );
  return NextResponse.json({ data: rows[0] });
}
