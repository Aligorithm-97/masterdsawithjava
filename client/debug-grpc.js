const grpc = require("@grpc/grpc-js");
const { loadSync } = require("@grpc/proto-loader");
const path = require("path");

console.log("=== gRPC Debug Test ===");

// Protobuf dosyasını yükle
const PROTO_PATH = path.join(__dirname, "proto", "post.proto");
console.log("Proto path:", PROTO_PATH);

try {
  const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  console.log("Package definition loaded successfully");
  console.log("Available services:", Object.keys(packageDefinition));

  const postProto = grpc.loadPackageDefinition(packageDefinition).post;
  console.log("Post proto loaded:", !!postProto);

  if (postProto && postProto.PostService) {
    console.log("PostService found");

    // Client oluştur
    const client = new postProto.PostService(
      "localhost:8090",
      grpc.credentials.createInsecure()
    );

    console.log("Client created, testing connection...");

    // Test CreatePost
    const createRequest = {
      title: "Test Post",
      summary: "Test Summary",
      category: "Java",
      subscriberOnly: 0,
      blocks: [
        {
          type: "paragraph",
          content: "Test content",
          url: "",
          alt: "",
          code: "",
          language: "",
        },
      ],
    };

    console.log("Sending CreatePost request:", createRequest);

    client.CreatePost(createRequest, (err, response) => {
      if (err) {
        console.error("CreatePost Error Details:");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        console.error("Details:", err.details);
        console.error("Metadata:", err.metadata);
        console.error("Stack:", err.stack);
      } else {
        console.log("CreatePost Success:", response);
      }
    });
  } else {
    console.error("PostService not found in proto definition");
    console.log("Available in postProto:", Object.keys(postProto || {}));
  }
} catch (error) {
  console.error("Error loading proto:", error);
}
