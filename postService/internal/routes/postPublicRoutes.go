package routes

import (
	"postService/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func PostPublicRoutes(r chi.Router) {
	r.Get("/posts", handlers.GetPosts)
	r.Get("/posts/{category}", handlers.GetPostbyCategory)
	r.Get("/postsById/{id}", handlers.GetPostById)
}
