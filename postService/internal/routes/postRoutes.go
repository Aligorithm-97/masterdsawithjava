package routes

import (
	"fmt"
	"postService/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func PostRoutes(r chi.Router) {
	fmt.Println("PostRoutes")
	r.Post("/posts", handlers.CreatePost)
	r.Get("/posts", handlers.GetPosts)
	r.Get("/posts/{category}", handlers.GetPostbyCategory)
}
