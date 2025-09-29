package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"postService/internal/models"
	services "postService/internal/service"

	"github.com/go-chi/chi/v5"
)

type Response struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func GetPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := services.PostService{}.GetPosts(r.Context())
	if err != nil {
		http.Error(w, "Postlar alinamadi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Postlar alindi", Data: posts})
}

func GetPostById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		http.Error(w, "Post ID belirtilmedi", http.StatusBadRequest)
		return
	}

	post, err := services.PostService{}.GetPostById(r.Context(), id)
	if err != nil {
		http.Error(w, "Post alinamadi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Post alindi", Data: post})
}

func GetPostbyCategory(w http.ResponseWriter, r *http.Request) {
	category := chi.URLParam(r, "category")

	if category == "" {
		http.Error(w, "Kategori belirtilmedi", http.StatusBadRequest)
		return
	}

	posts, err := services.PostService{}.GetPostbyCategory(r.Context(), category)
	if err != nil {
		http.Error(w, "Postlar alinamadi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Postlar alindi", Data: posts})
}

// internal/handlers/postHandler.go
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "JSON parse edilemedi: "+err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println("Post:", post)

	createdPost, err := services.PostService{}.Create(r.Context(), post)
	if err != nil {
		http.Error(w, "Post kaydedilemedi: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{Message: "Post kaydedildi", Data: createdPost})
}
