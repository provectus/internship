FROM golang:1.16-alpine as builder
WORKDIR /usr/src/app
COPY main.go go.mod ./
RUN echo "PORT=8888" > .env
RUN go get -d github.com/joho/godotenv
RUN CGO_ENABLED=0 GOOS=linux go build -o simple-webpage .

FROM alpine
WORKDIR /app
COPY --from=builder /usr/src/app /app
CMD ["./simple-webpage"]
