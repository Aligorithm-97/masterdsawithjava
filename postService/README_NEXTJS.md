# Next.js ile gRPC Backend Kullanımı

Bu kılavuz, Go gRPC backend'inizi Next.js frontend'inde nasıl kullanacağınızı gösterir.

## 🚀 Hızlı Başlangıç

### 1. Backend'i Başlatın

```bash
# Go backend'i çalıştırın (hem gRPC hem REST API)
go run cmd/postService/main.go
```

Bu komut:

- **gRPC Server**: `localhost:8090` portunda
- **REST API**: `localhost:8090/api` portunda

### 2. Next.js Projesinde Kullanın

#### Yöntem 1: REST API Wrapper (Önerilen)

Backend'iniz hem gRPC hem de REST API sağlar. Next.js'te REST API'yi kullanmak daha kolaydır.

```javascript
// lib/api.js
const API_BASE = "http://localhost:8090/api";

export async function createPost(postData) {
  const response = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  return response.json();
}

export async function getPosts(page = 1, limit = 10) {
  const response = await fetch(`${API_BASE}/posts?page=${page}&limit=${limit}`);
  return response.json();
}
```

#### Yöntem 2: gRPC-Web (Gelişmiş)

Doğrudan gRPC kullanmak istiyorsanız:

1. **gRPC-Web proxy kurun:**

```bash
# Envoy proxy ile
docker run --rm -p 8080:8080 \
  -v $(pwd)/envoy.yaml:/etc/envoy/envoy.yaml \
  envoyproxy/envoy:v1.25-latest
```

2. **Protobuf kodlarını generate edin:**

```bash
# JavaScript için
protoc --js_out=import_style=commonjs:./src/proto \
  --grpc-web_out=import_style=commonjs:./src/proto \
  proto/post.proto
```

## 📝 API Endpoints

### REST API (Port 8090)

| Method | Endpoint          | Açıklama          |
| ------ | ----------------- | ----------------- |
| POST   | `/api/posts`      | Yeni post oluştur |
| GET    | `/api/posts`      | Post listesi      |
| GET    | `/api/posts/{id}` | Tek post getir    |
| PUT    | `/api/posts/{id}` | Post güncelle     |
| DELETE | `/api/posts/{id}` | Post sil          |

### gRPC (Port 8090)

- `CreatePost`
- `GetPost`
- `ListPosts`
- `UpdatePost`
- `DeletePost`

## 🔧 Next.js Örnekleri

### 1. Basit API Çağrısı

```javascript
// pages/api/posts.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  }
}
```

### 2. React Hook ile

```javascript
// hooks/usePosts.js
import { useState, useEffect } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/posts");
      const data = await response.json();
      setPosts(data.data.posts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, fetchPosts };
}
```

### 3. Component'te Kullanım

```jsx
// components/PostList.jsx
import { usePosts } from "../hooks/usePosts";

export default function PostList() {
  const { posts, loading } = usePosts();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🛠️ Gelişmiş Kullanım

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

```javascript
// lib/config.js
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
```

### Error Handling

```javascript
// lib/api.js
export async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
```

### TypeScript Desteği

```typescript
// types/post.ts
export interface Post {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  subscriberOnly: number;
  blocks: Block[];
}

export interface Block {
  type: string;
  content: string;
  url?: string;
  alt?: string;
  code?: string;
  language?: string;
}
```

## 🚀 Production Deployment

### Docker ile

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

```bash
# Production
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 🔍 Debugging

### gRPC Debugging

```bash
# grpcurl ile test
grpcurl -plaintext localhost:8081 list
grpcurl -plaintext -d '{"title":"Test"}' localhost:8081 post.PostService/CreatePost
```

### REST API Debugging

```bash
# curl ile test
curl -X POST http://localhost:8080/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","summary":"Test","category":"Tech"}'
```

## 📚 Daha Fazla Bilgi

- [gRPC-Web Documentation](https://github.com/grpc/grpc-web)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Envoy Proxy](https://www.envoyproxy.io/)
