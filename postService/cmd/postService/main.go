package main

import (
	"fmt"
	"log"
	"net/http"

	"postService/internal/config"
	"postService/internal/db"
	"postService/internal/handlers"
	"postService/internal/kafka"
	"postService/internal/server"
	"postService/proto/postpb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	cfg := config.LoadConfig()

	// Initialize database
	db.InitMongo()

	// Initialize Kafka
	kafka.InitKafka(cfg.KafkaBrokers)
	defer kafka.Producer.Close()

	// Create gRPC server
	grpcServer := grpc.NewServer()
	postService := handlers.NewPostGRPCServer()
	postpb.RegisterPostServiceServer(grpcServer, postService)
	reflection.Register(grpcServer)

	// Create REST API wrapper
	restWrapper := server.NewRESTWrapper()
	router := restWrapper.SetupRoutes()

	// Create HTTP server with both gRPC and REST
	httpServer := &http.Server{
		Addr:    ":8090",
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// CORS headers
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-grpc-web, grpc-timeout")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			// Check if it's a gRPC request
			if r.Header.Get("Content-Type") == "application/grpc" || 
			   r.Header.Get("Content-Type") == "application/grpc-web" ||
			   r.URL.Path == "/post.PostService/" {
				// Handle gRPC requests
				grpcServer.ServeHTTP(w, r)
			} else {
				// Handle REST API requests
				router.ServeHTTP(w, r)
			}
		}),
	}

	fmt.Println("🚀 Server starting on port 8090...")
	fmt.Println("📡 gRPC Server: localhost:8090")
	fmt.Println("🌐 REST API: localhost:8090/api")
	fmt.Println("Available REST endpoints:")
	fmt.Println("  POST   /api/posts")
	fmt.Println("  GET    /api/posts")
	fmt.Println("  GET    /api/posts/{id}")
	fmt.Println("  PUT    /api/posts/{id}")
	fmt.Println("  DELETE /api/posts/{id}")

	log.Fatal(httpServer.ListenAndServe())
}
