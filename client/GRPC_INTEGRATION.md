# gRPC Integration for Posts API

This document describes the gRPC integration implemented for the Posts API in the Next.js client application.

## Overview

The Posts API has been updated to use gRPC for communication with the Go backend instead of REST API calls. This provides better performance, type safety, and more efficient binary serialization.

## Files Modified

### 1. Proto Definition

- **File**: `proto/post.proto`
- **Description**: Protocol Buffer definition for the Post service
- **Services**: CreatePost, GetPost, ListPosts, UpdatePost, DeletePost

### 2. API Routes Updated

- **File**: `app/api/posts/route.ts`
  - GET: List posts with pagination and filtering
  - POST: Create new post
- **File**: `app/api/posts/[id]/route.ts`
  - GET: Get single post by ID
  - PUT: Update post by ID
  - DELETE: Delete post by ID

## Dependencies Added

```json
{
  "@grpc/grpc-js": "^1.9.0",
  "@grpc/proto-loader": "^0.7.0"
}
```

## Environment Variables

Add the following environment variable to your `.env.local` file:

```env
GRPC_SERVER_URL=localhost:8081
```

## gRPC Service Definition

The Post service provides the following RPC methods:

### CreatePost

- **Request**: `CreatePostRequest`
- **Response**: `CreatePostResponse`
- **Description**: Creates a new post

### GetPost

- **Request**: `GetPostRequest` (id)
- **Response**: `GetPostResponse`
- **Description**: Retrieves a single post by ID

### ListPosts

- **Request**: `ListPostsRequest` (page, limit, category, search)
- **Response**: `ListPostsResponse`
- **Description**: Lists posts with pagination and filtering

### UpdatePost

- **Request**: `UpdatePostRequest`
- **Response**: `UpdatePostResponse`
- **Description**: Updates an existing post

### DeletePost

- **Request**: `DeletePostRequest` (id)
- **Response**: `DeletePostResponse`
- **Description**: Deletes a post by ID

## Message Types

### Post

```protobuf
message Post {
  int64 id = 1;
  string title = 2;
  string summary = 3;
  string category = 4;
  int32 subscriber_only = 5;
  repeated Block blocks = 6;
  string created_at = 7;
  string updated_at = 8;
}
```

### Block

```protobuf
message Block {
  string type = 1;
  string content = 2;
  map<string, string> attributes = 3;
}
```

## Usage

The gRPC client is automatically initialized when the API routes are accessed. The client connects to the Go backend using the configured server URL.

### Example API Calls

#### List Posts

```bash
GET /api/posts?page=1&limit=10&category=Java&search=spring
```

#### Create Post

```bash
POST /api/posts
Content-Type: application/json

{
  "title": "New Post",
  "summary": "Post summary",
  "category": "Java",
  "blocks": [
    {
      "type": "paragraph",
      "content": "Post content",
      "attributes": {}
    }
  ]
}
```

#### Get Single Post

```bash
GET /api/posts/123
```

#### Update Post

```bash
PUT /api/posts/123
Content-Type: application/json

{
  "title": "Updated Post",
  "summary": "Updated summary",
  "category": "Java",
  "blocks": [...]
}
```

#### Delete Post

```bash
DELETE /api/posts/123
```

## Error Handling

The API routes include proper error handling for gRPC errors:

- Connection errors
- Not found errors (404)
- Server errors (500)
- Validation errors (400)

## Go Backend Requirements

The Go backend must implement the Post service as defined in the `post.proto` file. The service should be running on the configured port (default: 8081).

## Benefits of gRPC Integration

1. **Performance**: Binary serialization is faster than JSON
2. **Type Safety**: Protocol Buffers provide strong typing
3. **Efficiency**: Smaller payload sizes
4. **Streaming**: Support for streaming requests/responses
5. **Code Generation**: Automatic client/server code generation
6. **Cross-Language**: Works across different programming languages

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the Go backend is running on the correct port
2. **Proto Load Error**: Check that the `post.proto` file is in the correct location
3. **Type Errors**: Ensure the proto definition matches the Go backend implementation

### Debug Mode

Enable debug logging by setting the environment variable:

```env
GRPC_DEBUG=1
```

## Future Enhancements

- Add authentication/authorization support
- Implement streaming for large datasets
- Add retry logic for failed requests
- Implement connection pooling
- Add metrics and monitoring
