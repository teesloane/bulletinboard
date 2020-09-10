run: 
	go run main.go api.go -path ~/Desktop/futur_insp
pack:
	bin/pkger

go-build: 
	make pack
	go build -o build/bulletinboard

release:
	make pack
	env GOOS=windows GOARCH=amd64 go build -o build/bulletinboard-windows
	env GOOS=darwin GOARCH=amd64 go build -o build/bulletinboard-mac
	env GOOS=linux GOARCH=amd64 go build -o build/bulletinboard-linux

release-local:
	make go-build
	cp build/bulletinboard /usr/local/bin/;

