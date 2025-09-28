import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "../../../../lib/api";
import { UpdatePostRequest } from "../../../../lib/types";
import grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import path from "path";

// Protobuf dosyasını yükle
const PROTO_PATH = path.join(process.cwd(), "proto", "post.proto");
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// gRPC client oluştur
const postProto = grpc.loadPackageDefinition(packageDefinition).post as any;
const client = new postProto.PostService(
  process.env.GRPC_SERVER_URL || "localhost:8090",
  grpc.credentials.createInsecure()
);

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const grpcRequest = { id: id };

    const response = await new Promise((resolve, reject) => {
      client.GetPost(grpcRequest, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return NextResponse.json({
      success: true,
      data: (response as any).post,
    });
  } catch (error: any) {
    console.error("gRPC Error:", error);
    if (error.code === grpc.status.NOT_FOUND) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdatePostRequest = await req.json();
    const { title, summary, blocks, category, date } = body;

    const grpcRequest = {
      id: id,
      title: title,
      summary: summary || "",
      category: category,
      subscriberOnly: 0, // Default value
      blocks: blocks || [],
    };

    const response = await new Promise((resolve, reject) => {
      client.UpdatePost(grpcRequest, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        id: (response as any).post.id,
        title: (response as any).post.title,
        message: (response as any).message,
      },
    });
  } catch (error: any) {
    console.error("gRPC Error:", error);
    if (error.code === grpc.status.NOT_FOUND) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const grpcRequest = { id: id };

    const response = await new Promise((resolve, reject) => {
      client.DeletePost(grpcRequest, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return NextResponse.json({
      success: true,
      message: (response as any).message,
    });
  } catch (error: any) {
    console.error("gRPC Error:", error);
    if (error.code === grpc.status.NOT_FOUND) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
