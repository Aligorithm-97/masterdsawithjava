const grpc = require('@grpc/grpc-js');
const { loadSync } = require('@grpc/proto-loader');
const path = require('path');

console.log('=== Testing Different Service Names ===');

const PROTO_PATH = path.join(__dirname, 'proto', 'post.proto');
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const postProto = grpc.loadPackageDefinition(packageDefinition).post;

// Farklı service name'leri test et
const serviceNames = ['PostService', 'PostAPI', 'Post', 'PostServiceClient'];

async function testService(serviceName) {
  return new Promise((resolve) => {
    console.log(`\n=== Testing service: ${serviceName} ===`);
    
    try {
      const ServiceClass = postProto[serviceName];
      if (!ServiceClass) {
        console.log(`Service ${serviceName} not found`);
        resolve(false);
        return;
      }

      const client = new ServiceClass(
        'localhost:8090',
        grpc.credentials.createInsecure()
      );

      console.log(`Client created for ${serviceName}`);

      // Farklı method name'leri test et
      const methods = ['CreatePost', 'Create', 'createPost', 'create'];
      
      for (const method of methods) {
        if (typeof client[method] === 'function') {
          console.log(`Found method: ${method}`);
          
          const createRequest = {
            title: 'Test Post',
            summary: 'Test Summary',
            category: 'Java',
            subscriber_only: 0,
            blocks: []
          };

          client[method](createRequest, (err, response) => {
            if (err) {
              console.log(`Method ${method} error:`, err.code, err.message);
            } else {
              console.log(`Method ${method} SUCCESS:`, response);
              resolve(true);
            }
          });
          
          // Sadece ilk method'u test et
          break;
        }
      }
      
      resolve(false);
    } catch (error) {
      console.log(`Error testing ${serviceName}:`, error.message);
      resolve(false);
    }
  });
}

async function testAllServices() {
  for (const serviceName of serviceNames) {
    const success = await testService(serviceName);
    if (success) {
      console.log(`\n✅ Found working service: ${serviceName}`);
      break;
    }
  }
}

testAllServices().catch(console.error);
