package handlers

import (
	"encoding/json"
	"net/http"

	"postService/internal/models"
	services "postService/internal/service"
)

type Response struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// internal/handlers/postHandler.go
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "JSON parse edilemedi: "+err.Error(), http.StatusBadRequest)
		return
	}

	createdPost, err := services.PostService{}.Create(r.Context(), post)
	if err != nil {
		http.Error(w, "Post kaydedilemedi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Post kaydedildi", Data: createdPost})
}
