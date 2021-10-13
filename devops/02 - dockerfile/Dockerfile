FROM golang:1.15
WORKDIR /usr/src/app
COPY main.go .
COPY go.mod .
COPY .env .
RUN go get -d -v github.com/joho/godotenv/cmd/godotenv
# RUN go get -d github.com/joho/godotenv 
RUN CGO_ENABLED=0 GOOS=linux go build -o simple-webpage .
CMD ["./simple-webpage"]

