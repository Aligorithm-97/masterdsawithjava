package server

import (
	"encoding/json"
	"net/http"
	"strconv"

	"postService/proto/postpb"

	"github.com/gorilla/mux"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type RESTWrapper struct {
	grpcClient postpb.PostServiceClient
}

func NewRESTWrapper() *RESTWrapper {
	// gRPC client bağlantısı
	conn, err := grpc.Dial("localhost:8081", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		panic("gRPC bağlantısı kurulamadı: " + err.Error())
	}

	return &RESTWrapper{
		grpcClient: postpb.NewPostServiceClient(conn),
	}
}

func (r *RESTWrapper) SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	// CORS middleware
	router.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if req.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, req)
		})
	})

	// API routes
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/posts", r.createPost).Methods("POST")
	api.HandleFunc("/posts", r.listPosts).Methods("GET")
	api.HandleFunc("/posts/{id}", r.getPost).Methods("GET")
	api.HandleFunc("/posts/{id}", r.updatePost).Methods("PUT")
	api.HandleFunc("/posts/{id}", r.deletePost).Methods("DELETE")

	return router
}

func (r *RESTWrapper) createPost(w http.ResponseWriter, req *http.Request) {
	var body struct {
		Title          string `json:"title"`
		Summary        string `json:"summary"`
		Category       string `json:"category"`
		SubscriberOnly int32  `json:"subscriberOnly"`
		Blocks         []struct {
			Type     string `json:"type"`
			Content  string `json:"content"`
			URL      string `json:"url"`
			Alt      string `json:"alt"`
			Code     string `json:"code"`
			Language string `json:"language"`
		} `json:"blocks"`
	}

	if err := json.NewDecoder(req.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// gRPC request oluştur
	grpcReq := &postpb.CreatePostRequest{
		Title:          body.Title,
		Summary:        body.Summary,
		Category:       body.Category,
		SubscriberOnly: body.SubscriberOnly,
	}

	// Blocks ekle
	for _, block := range body.Blocks {
		grpcReq.Blocks = append(grpcReq.Blocks, &postpb.Block{
			Type:     block.Type,
			Content:  block.Content,
			Url:      block.URL,
			Alt:      block.Alt,
			Code:     block.Code,
			Language: block.Language,
		})
	}

	// gRPC çağrısı yap
	grpcResp, err := r.grpcClient.CreatePost(req.Context(), grpcReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Response dönüştür
	response := map[string]interface{}{
		"success": true,
		"data": map[string]interface{}{
			"id":      grpcResp.Post.Id,
			"title":   grpcResp.Post.Title,
			"message": grpcResp.Message,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (r *RESTWrapper) listPosts(w http.ResponseWriter, req *http.Request) {
	// Query parameters
	page := req.URL.Query().Get("page")
	limit := req.URL.Query().Get("limit")

	grpcReq := &postpb.ListPostsRequest{
		Page:  1,
		Limit: 10,
	}

	// Parse page ve limit
	if page != "" {
		if p, err := strconv.ParseInt(page, 10, 32); err == nil {
			grpcReq.Page = int32(p)
		}
	}
	if limit != "" {
		if l, err := strconv.ParseInt(limit, 10, 32); err == nil {
			grpcReq.Limit = int32(l)
		}
	}

	grpcResp, err := r.grpcClient.ListPosts(req.Context(), grpcReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Posts dönüştür
	var posts []map[string]interface{}
	for _, post := range grpcResp.Posts {
		var blocks []map[string]interface{}
		for _, block := range post.Blocks {
			blocks = append(blocks, map[string]interface{}{
				"type":     block.Type,
				"content":  block.Content,
				"url":      block.Url,
				"alt":      block.Alt,
				"code":     block.Code,
				"language": block.Language,
			})
		}

		posts = append(posts, map[string]interface{}{
			"id":             post.Id,
			"title":          post.Title,
			"summary":        post.Summary,
			"category":       post.Category,
			"date":           post.Date.AsTime(),
			"subscriberOnly": post.SubscriberOnly,
			"blocks":         blocks,
		})
	}

	response := map[string]interface{}{
		"success": true,
		"data": map[string]interface{}{
			"posts": posts,
			"total": grpcResp.Total,
			"page":  grpcResp.Page,
			"limit": grpcResp.Limit,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (r *RESTWrapper) getPost(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id := vars["id"]

	grpcReq := &postpb.GetPostRequest{Id: id}
	grpcResp, err := r.grpcClient.GetPost(req.Context(), grpcReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	// Post dönüştür
	var blocks []map[string]interface{}
	for _, block := range grpcResp.Post.Blocks {
		blocks = append(blocks, map[string]interface{}{
			"type":     block.Type,
			"content":  block.Content,
			"url":      block.Url,
			"alt":      block.Alt,
			"code":     block.Code,
			"language": block.Language,
		})
	}

	post := map[string]interface{}{
		"id":             grpcResp.Post.Id,
		"title":          grpcResp.Post.Title,
		"summary":        grpcResp.Post.Summary,
		"category":       grpcResp.Post.Category,
		"date":           grpcResp.Post.Date.AsTime(),
		"subscriberOnly": grpcResp.Post.SubscriberOnly,
		"blocks":         blocks,
	}

	response := map[string]interface{}{
		"success": true,
		"data":    post,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (r *RESTWrapper) updatePost(w http.ResponseWriter, req *http.Request) {
	// UpdatePost implementasyonu
	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

func (r *RESTWrapper) deletePost(w http.ResponseWriter, req *http.Request) {
	// DeletePost implementasyonu
	http.Error(w, "Not implemented", http.StatusNotImplemented)
}
