package db

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Block struct {
	Type     string `bson:"type" json:"type"`
	Content  string `bson:"content,omitempty" json:"content,omitempty"`
	URL      string `bson:"url,omitempty" json:"url,omitempty"`
	Alt      string `bson:"alt,omitempty" json:"alt,omitempty"`
	Code     string `bson:"code,omitempty" json:"code,omitempty"`
	Language string `bson:"language,omitempty" json:"language,omitempty"`
}

type Post struct {
	ID             string    `bson:"_id,omitempty" json:"id"`
	Blocks         []Block   `bson:"blocks" json:"blocks"`
	Category       string    `bson:"category" json:"category"`
	Date           time.Time `bson:"date" json:"date"`
	Summary        string    `bson:"summary" json:"summary"`
	Title          string    `bson:"title" json:"title"`
	SubscriberOnly int       `bson:"subscriberOnly,omitempty" json:"subscriberOnly,omitempty"`
}

var MongoClient *mongo.Client
var PostCollection *mongo.Collection

func InitMongo() {
	uri := os.Getenv("MONGO_URI")
	dbName := os.Getenv("MONGO_DB")

	clientOpts := options.Client().ApplyURI(uri)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatalf("Mongo connection failed: %v", err)
	}

	// bağlantıyı test et
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Mongo ping failed: %v", err)
	}

	MongoClient = client
	PostCollection = client.Database(dbName).Collection("posts")

	log.Println("✅ Connected to MongoDB")
}
