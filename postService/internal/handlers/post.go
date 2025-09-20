package handlers

import (
	"encoding/json"
	"net/http"

	"postService/internal/kafka"
)

type Response struct {
	Message string `json:"message"`
}

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Merhaba, Post Service çalışıyor!"})
}

func PublishHandler(w http.ResponseWriter, r *http.Request) {
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

	if err := kafka.Publish("test", message); err != nil {
		http.Error(w, "Mesaj gönderilemedi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Mesaj gönderildi: " + message})
}
