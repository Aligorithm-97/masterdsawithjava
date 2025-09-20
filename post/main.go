package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Merhaba, Go backend çalışıyor!"})
}

func main() {
	http.HandleFunc("/hello", helloHandler)

	fmt.Println("Server 8081 portunda çalışıyor...")
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("Server başlatılamadı:", err)
	}
}
