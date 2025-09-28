const grpc = require("@grpc/grpc-js");
const { loadSync } = require("@grpc/proto-loader");
const path = require("path");

console.log("=== Testing All Ports ===");

const PROTO_PATH = path.join(__dirname, "proto", "post.proto");
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const postProto = grpc.loadPackageDefinition(packageDefinition).post;

// Test edilecek portlar
const ports = [8090, 8080, 50051, 50052, 8081, 9090];

async function testPort(port) {
  return new Promise((resolve) => {
    console.log(`\n=== Testing port ${port} ===`);

    const client = new postProto.PostService(
      `localhost:${port}`,
      grpc.credentials.createInsecure()
    );

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

    // 3 saniye timeout ile test et
    const timeout = setTimeout(() => {
      console.log(`Port ${port}: Timeout`);
      resolve(false);
    }, 3000);

    client.CreatePost(createRequest, (err, response) => {
      clearTimeout(timeout);
      if (err) {
        console.log(`Port ${port}: Error - ${err.code}: ${err.message}`);
        resolve(false);
      } else {
        console.log(`Port ${port}: SUCCESS!`, response);
        resolve(true);
      }
    });
  });
}

async function testAllPorts() {
  for (const port of ports) {
    const success = await testPort(port);
    if (success) {
      console.log(`\n✅ Found working gRPC server on port ${port}`);
      break;
    }
  }
}

testAllPorts().catch(console.error);
