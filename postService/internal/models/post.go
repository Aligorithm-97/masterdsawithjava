package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Block struct {
	Type     string   `bson:"type" json:"type"`
	Content  string   `bson:"content,omitempty" json:"content,omitempty"`
	URL      string   `bson:"url,omitempty" json:"url,omitempty"`
	Alt      string   `bson:"alt,omitempty" json:"alt,omitempty"`
	Code     string   `bson:"code,omitempty" json:"code,omitempty"`
	Language string   `bson:"language,omitempty" json:"language,omitempty"`
	Dec      string   `bson:"dec,omitempty" json:"dec,omitempty"`
	List     []string `bson:"list,omitempty" json:"list,omitempty"`
}

type Post struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Blocks         []Block            `bson:"blocks" json:"blocks"`
	Category       string             `bson:"category" json:"category"`
	Date           time.Time          `bson:"date" json:"date"`
	Summary        string             `bson:"summary" json:"summary"`
	Title          string             `bson:"title" json:"title"`
	SubscriberOnly int                `bson:"subscriberOnly,omitempty" json:"subscriberOnly,omitempty"`
}
