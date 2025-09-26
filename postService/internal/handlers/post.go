package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"postService/internal/db"
	"postService/internal/kafka"
	"postService/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Response struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "✅ Post Service çalışıyor!"})
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Sadece POST destekleniyor", http.StatusMethodNotAllowed)
		return
	}

	var post models.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, "JSON parse edilemedi: "+err.Error(), http.StatusBadRequest)
		return
	}

	post.ID = primitive.NewObjectID().Hex()
	if post.Date.IsZero() {
		post.Date = time.Now()
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := db.PostCollection.InsertOne(ctx, post)
	if err != nil {
		http.Error(w, "MongoDB insert başarısız: "+err.Error(), http.StatusInternalServerError)
		return
	}

	_ = kafka.Publish("posts", "Yeni post oluşturuldu: "+post.Title)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Post kaydedildi", Data: post})
}

func GetPosts(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := db.PostCollection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "MongoDB find hatası: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	if err := cursor.All(ctx, &posts); err != nil {
		http.Error(w, "MongoDB decode hatası: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Postlar getirildi", Data: posts})
}
