# Post Service - gRPC API

Bu proje REST API yerine gRPC kullanarak post yönetimi sağlar.

## Özellikler

- **CreatePost**: Yeni post oluşturma
- **GetPost**: ID ile post getirme
- **ListPosts**: Sayfalama ile post listesi
- **UpdatePost**: Post güncelleme
- **DeletePost**: Post silme

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
go mod tidy
```

2. Environment variables ayarlayın (.env dosyası):

```
MONGO_URI=mongodb://localhost:27017
MONGO_DB=postservice
KAFKA_BROKERS=localhost:9092
SERVER_PORT=8080
```

3. Server'ı çalıştırın:

```bash
go run cmd/postService/main.go
```

## gRPC Client Kullanımı

Örnek client kodu `examples/grpc_client.go` dosyasında bulunmaktadır.

Client'ı çalıştırmak için:

```bash
go run examples/grpc_client.go
```

## API Endpoints

### CreatePost

```protobuf
rpc CreatePost(CreatePostRequest) returns (CreatePostResponse);
```

### GetPost

```protobuf
rpc GetPost(GetPostRequest) returns (GetPostResponse);
```

### ListPosts

```protobuf
rpc ListPosts(ListPostsRequest) returns (ListPostsResponse);
```

### UpdatePost

```protobuf
rpc UpdatePost(UpdatePostRequest) returns (UpdatePostResponse);
```

### DeletePost

```protobuf
rpc DeletePost(DeletePostRequest) returns (DeletePostResponse);
```

## Protobuf Dosyaları

Protobuf tanımları `proto/post.proto` dosyasında bulunmaktadır. Kod generate etmek için:

```bash
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/post.proto
```

## Test Etme

gRPC reflection etkin olduğu için [grpcurl](https://github.com/fullstorydev/grpcurl) veya [BloomRPC](https://github.com/uw-labs/bloomrpc) gibi araçlarla test edebilirsiniz.

### grpcurl ile test:

```bash
# Servisleri listele
grpcurl -plaintext localhost:8080 list

# CreatePost çağrısı
grpcurl -plaintext -d '{
  "title": "Test Post",
  "summary": "Test summary",
  "category": "Test",
  "blocks": [{"type": "text", "content": "Test content"}]
}' localhost:8080 post.PostService/CreatePost
```

## Proje Yapısı

```
postService/
├── cmd/postService/main.go          # Ana uygulama
├── internal/
│   ├── config/                      # Konfigürasyon
│   ├── db/                          # Veritabanı modelleri ve bağlantı
│   ├── handlers/                    # gRPC handler'ları
│   ├── kafka/                       # Kafka producer
│   └── server/                      # gRPC server
├── proto/                           # Protobuf dosyaları
│   ├── post.proto
│   └── postpb/                      # Generated Go kodları
└── examples/                        # Örnek client kodu
```
