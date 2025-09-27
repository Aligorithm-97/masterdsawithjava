package routes

import (
	"postService/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func PostRoutes(r chi.Router) {
	r.Route("/posts", func(r chi.Router) {
		r.Post("/", handlers.CreatePost)
		r.Get("/all", handlers.GetPosts)
		// r.Get("/{id}", handlers.GetPostByID) gibi eklemeler
	})
}