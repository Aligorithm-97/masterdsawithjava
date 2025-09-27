// internal/repositories/postRepository.go
package repositories

import (
	"context"
	"postService/internal/db"
	"postService/internal/models"

	"go.mongodb.org/mongo-driver/bson"
)

type PostRepository struct{}

func (r PostRepository) Insert(ctx context.Context, post models.Post) error {
	_, err := db.PostCollection.InsertOne(ctx, post)
	return err
}

func (r PostRepository) FindAll(ctx context.Context) ([]models.Post, error) {
	cursor, err := db.PostCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	if err := cursor.All(ctx, &posts); err != nil {
		return nil, err
	}
	return posts, nil
}
