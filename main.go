package main

import (
	"bytes"
	"flag"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"

	"github.com/markbates/pkger"
)

var validImage = map[string]bool{".jpg": true, ".png": true, ".webp": true, ".jpeg": true}
var folder string

// Load list of images in directory.
func loadFiles(files *[]string) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		fileExt := filepath.Ext(path)
		if validImage[fileExt] {
			*files = append(*files, info.Name())
		}
		return nil
	}
}

// OpenInBrowser opens a local url in the browser by running a os-dependant command
func OpenInBrowser(fileOrURL string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default: // "linux", "freebsd", "openbsd", "netbsd"
		cmd = "xdg-open"
	}
	args = append(args, fileOrURL)
	return exec.Command(cmd, args...).Start()
}

type indexPage struct {
	Images []string
}

func index(w http.ResponseWriter, req *http.Request) {
	var imgFiles []string

	buf := bytes.NewBuffer(nil)
	f, _ := pkger.Open("/tmpl/index.html")
	io.Copy(buf, f)
	f.Close()
	s := string(buf.Bytes())

	temp, err := template.New("index").Parse(s)
	if err != nil {
		log.Fatal("failed to get layout: ", err)
	}

	err = filepath.Walk(folder, loadFiles(&imgFiles))
	if err != nil {
		log.Fatal(err)
	}

	p := indexPage{Images: imgFiles}
	temp.Execute(w, p)
}

func main() {
	// Set up folder of images to load
	var err error
	folder, err = os.Getwd()
	if err != nil {
		log.Println(err)
	}
	// parse flag and overwrite folder if it exists.
	bbPath := flag.String("path", folder, "Custom path to load images from.")
	flag.Parse()
	folder = *bbPath

	// Setup file servers and handlers.
	fileServer := http.FileServer(http.Dir(folder))
	staticServer := http.FileServer(pkger.Dir("/static"))
	http.HandleFunc("/", index)
	http.Handle("/images/", http.StripPrefix("/images", fileServer))
	http.Handle("/static/", http.StripPrefix("/static/", staticServer))

	// Launch and serve.
	fmt.Print("Running bulletin board. Visit: http://localhost:8080.")
	OpenInBrowser("http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
