import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rows } = await query<any>("SELECT * FROM posts WHERE id = $1", [id]);
  if (!rows[0])
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { title, summary, blocks, category, date } = body;
  const { rows } = await query<any>(
    `UPDATE posts SET title=$1, summary=$2, blocks=$3, category=$4, date=$5 WHERE id=$6 RETURNING *`,
    [
      title,
      summary || "",
      JSON.stringify(blocks),
      category,
      date || new Date().toISOString(),
      id,
    ]
  );
  if (!rows[0])
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await query("DELETE FROM posts WHERE id=$1", [id]);
  return NextResponse.json({ ok: true });
}
