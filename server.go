package main

import (
	"os"
	"net/http"
)

func main() {
	wd, _ := os.Getwd()
	http.Handle("/", http.FileServer(http.Dir(wd)))
	http.ListenAndServe(":8080", nil)
}
