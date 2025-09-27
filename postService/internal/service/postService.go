// internal/services/postService.go
package services

import (
	"context"
	"time"

	"postService/internal/db"
	"postService/internal/kafka"
	"postService/internal/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostService struct{}

func (s PostService) Create(ctx context.Context, post models.Post) (models.Post, error) {
	// Business logic
	post.ID = primitive.NewObjectID().Hex()
	if post.Date.IsZero() {
		post.Date = time.Now()
	}

	// Save
	_, err := db.PostCollection.InsertOne(ctx, post)
	if err != nil {
		return post, err
	}

	// Event publish
	_ = kafka.Publish("posts", "Yeni post: "+post.Title)

	return post, nil
}
