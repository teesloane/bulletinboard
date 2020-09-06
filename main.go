package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var validImage = map[string]bool{".jpg": true, ".png": true, ".webp": true, ".jpeg": true}

// Load list of images in directory.
func loadFiles(files *[]string) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		// fmt.Print(filepath.Ext(path))
		fileExt := filepath.Ext(path)
		fmt.Print(info.Name())
		if validImage[fileExt] {
			*files = append(*files, info.Name())
		}
		return nil
	}
}

type indexPage struct {
	Images []string
}

var folder = "/Users/tees/Desktop/futur_insp" // TODO: replace this with reading in the CWD

func index(w http.ResponseWriter, req *http.Request) {
	var imgFiles []string

	temp, err := template.ParseFiles("tmpl/index.html")
	if err != nil {
		log.Fatal(err)
	}

	err = filepath.Walk(folder, loadFiles(&imgFiles))
	if err != nil {
		log.Fatal(err)
	}

	p := indexPage{Images: imgFiles}
	temp.Execute(w, p)
}

func main() {
	fileServer := http.FileServer(http.Dir(folder))

	http.HandleFunc("/", index)
	http.Handle("/images/", http.StripPrefix("/images", fileServer))
	fmt.Print("Booting imgboard server. Visit localhost:8080.")
	http.ListenAndServe(":8080", nil)
}
