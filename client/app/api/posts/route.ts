import { NextRequest, NextResponse } from "next/server";
import { Post, CreatePostRequest } from "../../../lib/types";
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const grpcRequest = {
      page: page,
      limit: pageSize,
      category: category,
      search: search,
    };

    const response = await new Promise((resolve, reject) => {
      client.ListPosts(grpcRequest, (err: any, response: any) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        posts: (response as any).posts,
        total: (response as any).total,
        page: (response as any).page,
        limit: (response as any).limit,
      },
    });
  } catch (error: any) {
    console.error("gRPC Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreatePostRequest = await req.json();
    const { title, summary, blocks, category, date } = body;

    if (!title || !category || !blocks) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const grpcRequest = {
      title: title,
      summary: summary || "",
      category: category,
      subscriberOnly: 0, // Default value
      blocks: blocks || [],
    };

    const response = await new Promise((resolve, reject) => {
      client.CreatePost(grpcRequest, (err: any, response: any) => {
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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
