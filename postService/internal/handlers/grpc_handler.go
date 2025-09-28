package handlers

import (
	"context"
	"time"

	"postService/internal/db"
	"postService/internal/kafka"
	"postService/proto/postpb"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type PostGRPCServer struct {
	postpb.UnimplementedPostServiceServer
}

func NewPostGRPCServer() *PostGRPCServer {
	return &PostGRPCServer{}
}

func (s *PostGRPCServer) CreatePost(ctx context.Context, req *postpb.CreatePostRequest) (*postpb.CreatePostResponse, error) {
	// Convert protobuf blocks to internal blocks
	var blocks []db.Block
	for _, pbBlock := range req.Blocks {
		blocks = append(blocks, db.Block{
			Type:     pbBlock.Type,
			Content:  pbBlock.Content,
			URL:      pbBlock.Url,
			Alt:      pbBlock.Alt,
			Code:     pbBlock.Code,
			Language: pbBlock.Language,
		})
	}

	// Create post
	post := db.Post{
		ID:             primitive.NewObjectID().Hex(),
		Blocks:         blocks,
		Category:       req.Category,
		Date:           time.Now(),
		Summary:        req.Summary,
		Title:          req.Title,
		SubscriberOnly: int(req.SubscriberOnly),
	}

	// Save to database
	_, err := db.PostCollection.InsertOne(ctx, post)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Post kaydedilemedi: %v", err)
	}

	// Publish event
	_ = kafka.Publish("posts", "Yeni post: "+post.Title)

	// Convert back to protobuf
	pbPost := convertToProtoPost(post)

	return &postpb.CreatePostResponse{
		Post:    pbPost,
		Message: "Post başarıyla oluşturuldu",
	}, nil
}

func (s *PostGRPCServer) GetPost(ctx context.Context, req *postpb.GetPostRequest) (*postpb.GetPostResponse, error) {
	var post db.Post
	err := db.PostCollection.FindOne(ctx, bson.M{"_id": req.Id}).Decode(&post)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "Post bulunamadı: %v", err)
	}

	pbPost := convertToProtoPost(post)
	return &postpb.GetPostResponse{
		Post: pbPost,
	}, nil
}

func (s *PostGRPCServer) ListPosts(ctx context.Context, req *postpb.ListPostsRequest) (*postpb.ListPostsResponse, error) {
	// Set default values
	page := int(req.Page)
	if page <= 0 {
		page = 1
	}
	limit := int(req.Limit)
	if limit <= 0 {
		limit = 10
	}

	// Calculate skip
	skip := (page - 1) * limit

	// Find options
	findOptions := options.Find()
	findOptions.SetSkip(int64(skip))
	findOptions.SetLimit(int64(limit))
	findOptions.SetSort(bson.D{{Key: "date", Value: -1}})

	// Get posts
	cursor, err := db.PostCollection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Postlar getirilemedi: %v", err)
	}
	defer cursor.Close(ctx)

	var posts []db.Post
	if err = cursor.All(ctx, &posts); err != nil {
		return nil, status.Errorf(codes.Internal, "Postlar decode edilemedi: %v", err)
	}

	// Get total count
	total, err := db.PostCollection.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Toplam post sayısı alınamadı: %v", err)
	}

	// Convert to protobuf
	var pbPosts []*postpb.Post
	for _, post := range posts {
		pbPosts = append(pbPosts, convertToProtoPost(post))
	}

	return &postpb.ListPostsResponse{
		Posts: pbPosts,
		Total: int32(total),
		Page:  int32(page),
		Limit: int32(limit),
	}, nil
}

func (s *PostGRPCServer) UpdatePost(ctx context.Context, req *postpb.UpdatePostRequest) (*postpb.UpdatePostResponse, error) {
	// Convert protobuf blocks to internal blocks
	var blocks []db.Block
	for _, pbBlock := range req.Blocks {
		blocks = append(blocks, db.Block{
			Type:     pbBlock.Type,
			Content:  pbBlock.Content,
			URL:      pbBlock.Url,
			Alt:      pbBlock.Alt,
			Code:     pbBlock.Code,
			Language: pbBlock.Language,
		})
	}

	// Update data
	update := bson.M{
		"$set": bson.M{
			"blocks":         blocks,
			"category":       req.Category,
			"summary":        req.Summary,
			"title":          req.Title,
			"subscriberOnly": req.SubscriberOnly,
		},
	}

	result, err := db.PostCollection.UpdateOne(ctx, bson.M{"_id": req.Id}, update)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Post güncellenemedi: %v", err)
	}

	if result.MatchedCount == 0 {
		return nil, status.Errorf(codes.NotFound, "Post bulunamadı")
	}

	// Get updated post
	var post db.Post
	err = db.PostCollection.FindOne(ctx, bson.M{"_id": req.Id}).Decode(&post)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Güncellenmiş post getirilemedi: %v", err)
	}

	pbPost := convertToProtoPost(post)
	return &postpb.UpdatePostResponse{
		Post:    pbPost,
		Message: "Post başarıyla güncellendi",
	}, nil
}

func (s *PostGRPCServer) DeletePost(ctx context.Context, req *postpb.DeletePostRequest) (*postpb.DeletePostResponse, error) {
	result, err := db.PostCollection.DeleteOne(ctx, bson.M{"_id": req.Id})
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Post silinemedi: %v", err)
	}

	if result.DeletedCount == 0 {
		return nil, status.Errorf(codes.NotFound, "Post bulunamadı")
	}

	return &postpb.DeletePostResponse{
		Message: "Post başarıyla silindi",
	}, nil
}

// Helper function to convert internal Post to protobuf Post
func convertToProtoPost(post db.Post) *postpb.Post {
	var pbBlocks []*postpb.Block
	for _, block := range post.Blocks {
		pbBlocks = append(pbBlocks, &postpb.Block{
			Type:     block.Type,
			Content:  block.Content,
			Url:      block.URL,
			Alt:      block.Alt,
			Code:     block.Code,
			Language: block.Language,
		})
	}

	return &postpb.Post{
		Id:             post.ID,
		Blocks:         pbBlocks,
		Category:       post.Category,
		Date:           timestamppb.New(post.Date),
		Summary:        post.Summary,
		Title:          post.Title,
		SubscriberOnly: int32(post.SubscriberOnly),
	}
}
