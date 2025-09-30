// internal/services/postService.go
package services

import (
	"context"
	"time"

	"postService/internal/db"
	"postService/internal/kafka"
	"postService/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostService struct{}

func (s PostService) GetPosts(ctx context.Context) ([]models.Post, error) {
	// Business logic
	cursor, err := db.PostCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	for cursor.Next(ctx) {
		var post models.Post
		if err := cursor.Decode(&post); err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, nil
}

func (s PostService) GetPostById(ctx context.Context, id string) (models.Post, error) {
	// Business logic
	postID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.Post{}, err
	}

	var post models.Post
	err = db.PostCollection.FindOne(ctx, bson.M{"_id": postID}).Decode(&post)
	if err != nil {
		return models.Post{}, err
	}

	return post, nil
}

func (s PostService) GetPostbyCategory(ctx context.Context, category string) ([]models.Post, error) {
	cursor, err := db.PostCollection.Find(ctx, bson.M{"category": category})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var posts []models.Post
	for cursor.Next(ctx) {
		var post models.Post
		if err := cursor.Decode(&post); err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, nil
}

func (s PostService) Create(ctx context.Context, post models.Post) (models.Post, error) {
	// Business logic
	post.ID = primitive.NewObjectID()
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
