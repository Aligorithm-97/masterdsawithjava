package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	KafkaBrokers []string
	ServerPort   string
	JwtSecret    string
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

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "default_jwt_secret"
	}

	return &Config{
		KafkaBrokers: []string{brokers},
		ServerPort:   port,
		JwtSecret:    jwtSecret,
	}
}
