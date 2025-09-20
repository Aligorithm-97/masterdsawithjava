package main

import (
	"fmt"
	"log"
	"net/http"

	"postService/internal/config"
	"postService/internal/handlers"
	"postService/internal/kafka"
)

func main() {
	cfg := config.LoadConfig()

	kafka.InitKafka(cfg.KafkaBrokers)
	defer kafka.Producer.Close()

	http.HandleFunc("/hello", handlers.HelloHandler)
	http.HandleFunc("/publish", handlers.PublishHandler)

	fmt.Printf("Post Service %s portunda çalışıyor...\n", cfg.ServerPort)
	err := http.ListenAndServe(":"+cfg.ServerPort, nil)
	if err != nil {
		log.Fatal("Server başlatılamadı:", err)
	}
}
