package server

import (
	"fmt"
	"log"
	"net"

	"postService/internal/config"
	"postService/internal/handlers"
	"postService/proto/postpb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func StartGRPCServer() {
	cfg := config.LoadConfig()

	// Create listener
	lis, err := net.Listen("tcp", ":"+cfg.ServerPort)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	// Create gRPC server
	grpcServer := grpc.NewServer()

	// Register services
	postService := handlers.NewPostGRPCServer()
	postpb.RegisterPostServiceServer(grpcServer, postService)

	// Enable reflection for testing
	reflection.Register(grpcServer)

	fmt.Printf("gRPC Server %s portunda çalışıyor...\n", cfg.ServerPort)

	// Start server
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
