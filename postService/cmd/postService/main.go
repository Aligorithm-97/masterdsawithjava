package main

import (
	"fmt"
	"log"
	"net/http"

	"postService/internal/config"
	"postService/internal/db"
	"postService/internal/handlers"
	"postService/internal/kafka"
)

func main() {
	cfg := config.LoadConfig()

	db.InitMongo()

	kafka.InitKafka(cfg.KafkaBrokers)
	defer kafka.Producer.Close()

	http.HandleFunc("/health", handlers.HelloHandler)
	http.HandleFunc("/posts", handlers.CreatePost)   // POST: yeni post
	http.HandleFunc("/posts/all", handlers.GetPosts) // GET: tüm postlar


	fmt.Printf("Post Service %s portunda çalışıyor...\n", cfg.ServerPort)
	err := http.ListenAndServe(":"+cfg.ServerPort, nil)
	if err != nil {
		log.Fatal("Server başlatılamadı:", err)
	}
}
