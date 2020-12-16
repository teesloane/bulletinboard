package main

import (
	"bytes"
	"flag"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/markbates/pkger"
	"github.com/skratchdot/open-golang/open"
)

var validImage = map[string]bool{".jpg": true, ".png": true, ".webp": true, ".jpeg": true, ".JPG": true}
var folder string
var port int
var recursive bool

const version = "0.0.1"

// Load list of images in directory.
func loadFiles(imgFiles *[]string) filepath.WalkFunc {
	return func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal(err)
		}
		imgPath, err := filepath.Rel(folder, path)
		if err != nil {
			log.Fatal(err)
		}

		fileExt := filepath.Ext(imgPath)
		if validImage[fileExt] {
			*imgFiles = append(*imgFiles, imgPath)
		}
		return nil
	}
}

type indexPage struct {
	Images []string
	Port   int
	Folder string
}

func index(w http.ResponseWriter, req *http.Request) {
	var imgFiles []string

	// Load the pkger'd template file
	buf := bytes.NewBuffer(nil)
	f, _ := pkger.Open("/tmpl/index.html")
	io.Copy(buf, f)
	f.Close()
	s := string(buf.Bytes())
	temp, err := template.New("index").Parse(s)
	if err != nil {
		log.Fatal("failed to get layout: ", err)
	}

	// Load the image files to be served.
	if recursive {
		err = filepath.Walk(folder, loadFiles(&imgFiles))
		if err != nil {
			log.Fatal(err)
		}
	} else {
		files, err := ioutil.ReadDir(folder)
		if err != nil {
			log.Fatal(err)
		}
		for _, file := range files {
			fileExt := filepath.Ext(file.Name())
			if validImage[fileExt] {
				imgFiles = append(imgFiles, file.Name())
			}
		}
	}

	p := indexPage{Images: imgFiles, Port: port, Folder: folder}
	temp.Execute(w, p)
}

func main() {
	// Set up folder of images to load
	var err error
	folder, err = os.Getwd()
	if err != nil {
		log.Println(err)
	}

	// Flags
	flag.StringVar(&folder, "path", folder, "Custom path to load images from.")
	flag.BoolVar(&recursive, "recursive", false, "Load image in any subdirectories.")
	ver := flag.Bool("v", false, "print application version")
	flag.Parse()
	if *ver {
		fmt.Println(version)
		os.Exit(0)
	}
	if _, err := os.Stat(folder); os.IsNotExist(err) {
		fmt.Println("❗️ The folder you specified does not exist: ", folder)
		os.Exit(1)
	}

	// Setup file servers and handlers.
	fileServer := http.FileServer(http.Dir(folder))
	staticServer := http.FileServer(pkger.Dir("/static"))
	http.HandleFunc("/", index)
	http.HandleFunc("/api/", SwitchPoint)
	http.Handle("/images/", http.StripPrefix("/images", fileServer))
	http.Handle("/static/", http.StripPrefix("/static/", staticServer))

	// Launch and serve.
	// We manually create our listener so we can get the random port
	listener, err := net.Listen("tcp", ":0") // ":0" gets first available port.
	if err != nil {
		panic(err)
	}

	port = listener.Addr().(*net.TCPAddr).Port
	url := "http://localhost:" + strconv.Itoa(port)

	fmt.Print("Running bulletin board. Visit: " + url)
	open.Run(url)
	panic(http.Serve(listener, nil))
}
