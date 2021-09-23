package main

import (
				"net/http"
				"os"
        "log"
        "fmt"
        "github.com/joho/godotenv"
)

var counter = 0

func indexHandler(w http.ResponseWriter, r *http.Request) {
        hostname, _ := os.Hostname()
	w.Write([]byte(fmt.Sprintf("<h1>Hello, hostname is %s and counter is %d</h1>" , hostname, counter)))
        counter++
}

func main() {
        err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", indexHandler)
	http.ListenAndServe(":"+port, mux)
}
