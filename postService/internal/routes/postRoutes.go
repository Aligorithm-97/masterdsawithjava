package routes

import (
	"postService/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func PostRoutes(r chi.Router) {
	r.Post("/posts", handlers.CreatePost)
}
