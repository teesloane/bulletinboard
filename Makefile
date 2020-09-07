run: 
	go run main.go -path ~/Desktop/futur_insp

build: 
	bin/pkger; go build; cp bulletinboard /usr/local/bin/