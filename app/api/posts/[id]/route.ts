import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { rows } = await query<any>("SELECT * FROM posts WHERE id = $1", [
    params.id,
  ]);
  if (!rows[0])
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      params.id,
    ]
  );
  if (!rows[0])
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rows[0] });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await query("DELETE FROM posts WHERE id=$1", [params.id]);
  return NextResponse.json({ ok: true });
}
