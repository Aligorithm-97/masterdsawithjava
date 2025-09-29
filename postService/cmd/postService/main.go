package main

import (
	"fmt"
	"log"
	"net/http"

	"postService/internal/config"
	"postService/internal/db"
	"postService/internal/kafka"
	"postService/internal/routes"

	"github.com/go-chi/chi/v5"
)

func main() {
	cfg := config.LoadConfig()

	db.InitMongo()
	r := chi.NewRouter()
	kafka.InitKafka(cfg.KafkaBrokers)
	defer kafka.Producer.Close()

	routes.PostRoutes(r)

	fmt.Printf("Post Service %s portunda çalışıyor...\n", cfg.ServerPort)
	err := http.ListenAndServe(":"+cfg.ServerPort, r)

	if err != nil {
		log.Fatal("Server başlatılamadı:", err)
	}
}
