package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	KafkaBrokers []string
	ServerPort   string
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println(".env yüklenemedi, environment variable kullanılacak")
	}

	brokers := os.Getenv("KAFKA_BROKERS")
	if brokers == "" {
		brokers = "localhost:9092"
	}

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8090"
	}

	return &Config{
		KafkaBrokers: []string{brokers},
		ServerPort:   port,
	}
}
