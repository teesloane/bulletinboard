package main

import (
	"net/http"
	"path/filepath"
	"strings"

	"github.com/skratchdot/open-golang/open"
)

// SwitchPoint is a pretend Endpoint.
func SwitchPoint(w http.ResponseWriter, req *http.Request) {
	typ := req.URL.Query().Get("type")
	switch typ {
	case "open-locally":
		imgURL := req.URL.Query().Get("imgURL")
		fileName := imgURL[strings.LastIndex(imgURL, "/")+1:]
		filePath := filepath.Join(folder, fileName)
		open.Run(filePath)
	default:
	}
}
