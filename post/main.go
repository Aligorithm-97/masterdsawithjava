package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/IBM/sarama"
)

type Response struct {
	Message string `json:"message"`
}

// Kafka producer global değişken
var producer sarama.SyncProducer

func initKafka() {
	brokers := []string{"localhost:9092"} // Kafka broker adresi
	config := sarama.NewConfig()
	config.Producer.Return.Successes = true

	var err error
	producer, err = sarama.NewSyncProducer(brokers, config)
	if err != nil {
		log.Fatal("Kafka producer başlatılamadı:", err)
	}
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Merhaba, Go backend çalışıyor!"})
}

// /publish endpoint → Kafka'ya mesaj gönder
func publishHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Sadece POST destekleniyor", http.StatusMethodNotAllowed)
		return
	}

	var reqBody map[string]string
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		http.Error(w, "JSON parse edilemedi", http.StatusBadRequest)
		return
	}

	message := reqBody["message"]
	if message == "" {
		message = "Default mesaj"
	}

	msg := &sarama.ProducerMessage{
		Topic: "test", // Kafka topic adı
		Value: sarama.StringEncoder(message),
	}

	_, _, err = producer.SendMessage(msg)
	if err != nil {
		http.Error(w, "Mesaj gönderilemedi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Mesaj gönderildi: " + message})
}

func main() {
	// Kafka bağlantısını başlat
	initKafka()
	defer producer.Close()

	// HTTP endpointler
	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/publish", publishHandler)

	fmt.Println("Server 8081 portunda çalışıyor...")
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("Server başlatılamadı:", err)
	}
}
