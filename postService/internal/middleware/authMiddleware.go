package middleware

import (
	"context"
	"net/http"
	"postService/internal/config"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// Key to store user info in context
type contextKey string

const UserCtxKey contextKey = "user"

// Middleware function
func AuthMiddleware(next http.Handler) http.Handler {
	cfg := config.LoadConfig()
	var JwtSecret = cfg.JwtSecret

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		// Expect: "Bearer <token>"
		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			http.Error(w, "Invalid Authorization header", http.StatusUnauthorized)
			return
		}

		tokenString := parts[1]
		// Parse and validate token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, http.ErrAbortHandler
			}
			// Spring ile aynı mantık: raw UTF-8 bytes
			return []byte(JwtSecret), nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		// Opsiyonel: Claims içindeki user info
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			// Context’e ekle
			ctx := context.WithValue(r.Context(), UserCtxKey, claims)
			r = r.WithContext(ctx)
		}

		// Sonraki handler’a geç
		next.ServeHTTP(w, r)
	})
}
