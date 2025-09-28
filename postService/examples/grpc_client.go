package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"postService/proto/postpb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// gRPC bağlantısı oluştur
	conn, err := grpc.Dial("localhost:8081", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Bağlantı kurulamadı: %v", err)
	}
	defer conn.Close()

	// Client oluştur
	client := postpb.NewPostServiceClient(conn)

	// CreatePost örneği
	createReq := &postpb.CreatePostRequest{
		Title:    "İlk gRPC Post",
		Summary:  "Bu bir gRPC ile oluşturulan post örneğidir",
		Category: "Teknoloji",
		Blocks: []*postpb.Block{
			{
				Type:    "text",
				Content: "Merhaba, bu gRPC ile oluşturulan bir post!",
			},
			{
				Type:     "code",
				Content:  "func main() {\n    fmt.Println(\"Hello gRPC!\")\n}",
				Language: "go",
			},
		},
		SubscriberOnly: 0,
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	createResp, err := client.CreatePost(ctx, createReq)
	if err != nil {
		log.Fatalf("CreatePost hatası: %v", err)
	}

	fmt.Printf("Post oluşturuldu: %s\n", createResp.Message)
	fmt.Printf("Post ID: %s\n", createResp.Post.Id)

	// ListPosts örneği
	listReq := &postpb.ListPostsRequest{
		Page:  1,
		Limit: 10,
	}

	listResp, err := client.ListPosts(ctx, listReq)
	if err != nil {
		log.Fatalf("ListPosts hatası: %v", err)
	}

	fmt.Printf("\nToplam %d post bulundu:\n", listResp.Total)
	for _, post := range listResp.Posts {
		fmt.Printf("- %s (%s)\n", post.Title, post.Category)
	}

	// GetPost örneği (oluşturulan postu getir)
	getReq := &postpb.GetPostRequest{
		Id: createResp.Post.Id,
	}

	getResp, err := client.GetPost(ctx, getReq)
	if err != nil {
		log.Fatalf("GetPost hatası: %v", err)
	}

	fmt.Printf("\nPost detayları:\n")
	fmt.Printf("Başlık: %s\n", getResp.Post.Title)
	fmt.Printf("Özet: %s\n", getResp.Post.Summary)
	fmt.Printf("Kategori: %s\n", getResp.Post.Category)
	fmt.Printf("Tarih: %s\n", getResp.Post.Date.AsTime().Format("2006-01-02 15:04:05"))
}
