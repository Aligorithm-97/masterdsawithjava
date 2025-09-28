# Next.js'te Gerçek gRPC Kullanımı

## 1. gRPC-Web Kurulumu

### Backend'de gRPC-Web Desteği Ekleyin

```go
// internal/server/grpc_web_server.go
package server

import (
    "net/http"
    "github.com/improbable-eng/grpc-web/go/grpcweb"
    "google.golang.org/grpc"
)

func StartGRPCWebServer(grpcServer *grpc.Server) {
    // gRPC-Web wrapper
    wrappedGrpc := grpcweb.WrapServer(grpcServer)

    handler := http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
        // CORS headers
        resp.Header().Set("Access-Control-Allow-Origin", "*")
        resp.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        resp.Header().Set("Access-Control-Allow-Headers", "Content-Type, x-grpc-web, grpc-timeout")

        if req.Method == "OPTIONS" {
            resp.WriteHeader(http.StatusOK)
            return
        }

        wrappedGrpc.ServeHTTP(resp, req)
    })

    http.ListenAndServe(":8080", handler)
}
```

### Frontend'de Protobuf Kodları

```bash
# JavaScript protobuf kodları generate et
protoc --js_out=import_style=commonjs:./src/proto \
  --grpc-web_out=import_style=commonjs:./src/proto \
  proto/post.proto
```

### Next.js'te Kullanım

```javascript
// src/proto/post_grpc_web_pb.js (generated)
import { PostServiceClient } from "./post_grpc_web_pb";
import { CreatePostRequest } from "./post_pb";

const client = new PostServiceClient("http://localhost:8080");

// Gerçek gRPC çağrısı
const request = new CreatePostRequest();
request.setTitle("Test Post");
request.setSummary("Test Summary");

client.createPost(request, {}, (err, response) => {
  if (err) {
    console.error("gRPC Error:", err);
  } else {
    console.log("Response:", response.toObject());
  }
});
```

## 2. Server-Side gRPC (Next.js API Routes)

```javascript
// pages/api/posts.js
import { PostServiceClient } from "../../../proto/post_grpc_web_pb";
import { CreatePostRequest } from "../../../proto/post_pb";
import grpc from "@grpc/grpc-js";

export default async function handler(req, res) {
  // gRPC client oluştur
  const client = new PostServiceClient(
    "localhost:8081",
    grpc.credentials.createInsecure()
  );

  if (req.method === "POST") {
    const request = new CreatePostRequest();
    request.setTitle(req.body.title);
    request.setSummary(req.body.summary);

    // gRPC çağrısı
    client.createPost(request, (err, response) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true, data: response.toObject() });
      }
    });
  }
}
```

## 3. Streaming ile Real-time Özellikler

```protobuf
// proto/post.proto
service PostService {
  rpc CreatePost(CreatePostRequest) returns (CreatePostResponse);
  rpc StreamPosts(StreamPostsRequest) returns (stream Post); // Streaming
}
```

```javascript
// Next.js'te streaming
const stream = client.streamPosts(request);
stream.on("data", (post) => {
  console.log("New post:", post.toObject());
});
stream.on("end", () => {
  console.log("Stream ended");
});
```

## 4. Type Safety ile TypeScript

```typescript
// types/post.ts
export interface CreatePostRequest {
  title: string;
  summary: string;
  category: string;
  blocks: Block[];
}

// Generated protobuf types kullan
import { CreatePostRequest } from "./proto/post_pb";
```

## 5. Performance Karşılaştırması

| Özellik             | REST JSON | gRPC-Web   | gRPC (Server-side) |
| ------------------- | --------- | ---------- | ------------------ |
| **Payload Size**    | ~2x büyük | ~50% küçük | ~50% küçük         |
| **Parsing Speed**   | Yavaş     | Hızlı      | Çok Hızlı          |
| **Type Safety**     | Yok       | Var        | Var                |
| **Streaming**       | Yok       | Var        | Var                |
| **Browser Support** | Mükemmel  | İyi        | Yok                |

## 6. Production Deployment

### Envoy Proxy ile

```yaml
# envoy.yaml
static_resources:
  listeners:
    - name: listener_0
      address:
        socket_address:
          address: 0.0.0.0
          port_value: 8080
      filter_chains:
        - filters:
            - name: envoy.filters.network.http_connection_manager
              typed_config:
                "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  name: local_route
                  virtual_hosts:
                    - name: local_service
                      domains: ["*"]
                      routes:
                        - match:
                            prefix: "/"
                          route:
                            cluster: grpc_service
                http_filters:
                  - name: envoy.filters.http.grpc_web
                  - name: envoy.filters.http.router
  clusters:
    - name: grpc_service
      connect_timeout: 0.25s
      type: LOGICAL_DNS
      http2_protocol_options: {}
      lb_policy: ROUND_ROBIN
      load_assignment:
        cluster_name: grpc_service
        endpoints:
          - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      address: host.docker.internal
                      port_value: 8081
```

## Sonuç

- **REST Wrapper**: Kolay ama gRPC avantajlarını kaybeder
- **gRPC-Web**: Gerçek gRPC, browser'da çalışır
- **Server-side gRPC**: En performanslı, Next.js API routes'da

Hangi yöntemi tercih edersiniz?
