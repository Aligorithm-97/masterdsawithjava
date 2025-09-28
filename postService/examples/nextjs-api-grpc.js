// Next.js API Routes'da doğrudan gRPC kullanımı
// pages/api/posts.js veya app/api/posts/route.js

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
const postProto = grpc.loadPackageDefinition(packageDefinition).post;
const client = new postProto.PostService(
  "localhost:8090",
  grpc.credentials.createInsecure()
);

// POST /api/posts - Post oluştur
export async function POST(request) {
  try {
    const body = await request.json();

    // gRPC request oluştur
    const grpcRequest = {
      title: body.title,
      summary: body.summary,
      category: body.category,
      subscriberOnly: body.subscriberOnly || 0,
      blocks: body.blocks || [],
    };

    // gRPC çağrısı yap
    const response = await new Promise((resolve, reject) => {
      client.CreatePost(grpcRequest, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json({
      success: true,
      data: {
        id: response.post.id,
        title: response.post.title,
        message: response.message,
      },
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/posts - Post listesi
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const grpcRequest = {
      page: page,
      limit: limit,
    };

    const response = await new Promise((resolve, reject) => {
      client.ListPosts(grpcRequest, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json({
      success: true,
      data: {
        posts: response.posts,
        total: response.total,
        page: response.page,
        limit: response.limit,
      },
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET /api/posts/[id] - Tek post getir
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const grpcRequest = { id: id };

    const response = await new Promise((resolve, reject) => {
      client.GetPost(grpcRequest, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json({
      success: true,
      data: response.post,
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
}

// PUT /api/posts/[id] - Post güncelle
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const grpcRequest = {
      id: id,
      title: body.title,
      summary: body.summary,
      category: body.category,
      subscriberOnly: body.subscriberOnly || 0,
      blocks: body.blocks || [],
    };

    const response = await new Promise((resolve, reject) => {
      client.UpdatePost(grpcRequest, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json({
      success: true,
      data: {
        id: response.post.id,
        title: response.post.title,
        message: response.message,
      },
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Post sil
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const grpcRequest = { id: id };

    const response = await new Promise((resolve, reject) => {
      client.DeletePost(grpcRequest, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    console.error("gRPC Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
