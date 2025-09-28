package main

import (
	"fmt"
	"log"
	"net/http"

	"postService/internal/config"
	"postService/internal/db"
	"postService/internal/kafka"
	"postService/internal/server"
)

func main() {
	cfg := config.LoadConfig()

	// Initialize database
	db.InitMongo()

	// Initialize Kafka
	kafka.InitKafka(cfg.KafkaBrokers)
	defer kafka.Producer.Close()

	// Start gRPC server in goroutine
	go func() {
		fmt.Println("gRPC Server starting on port 8081...")
		server.StartGRPCServer()
	}()

	// Start REST API wrapper
	restWrapper := server.NewRESTWrapper()
	router := restWrapper.SetupRoutes()

	fmt.Println("REST API Server starting on port 8080...")
	fmt.Println("Available endpoints:")
	fmt.Println("  POST   /api/posts")
	fmt.Println("  GET    /api/posts")
	fmt.Println("  GET    /api/posts/{id}")
	fmt.Println("  PUT    /api/posts/{id}")
	fmt.Println("  DELETE /api/posts/{id}")

	log.Fatal(http.ListenAndServe(":8080", router))
}
