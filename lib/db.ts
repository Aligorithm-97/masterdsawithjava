import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5433/masterdsa";

export const db = new Pool({ connectionString });

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[] }> {
  const client = await db.connect();
  try {
    const res = await client.query<T>(text, params);
    return { rows: res.rows };
  } finally {
    client.release();
  }
}
