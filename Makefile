run: 
	go run main.go api.go util.go -path ~/Desktop/futur_insp

build: 
	bin/pkger; go build; cp bulletinboard /usr/local/bin/; /usr/local/bin/bulletinboard -path ~/Desktop/futur_insp