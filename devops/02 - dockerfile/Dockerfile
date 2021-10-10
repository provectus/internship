FROM golang:1.15 as builder
WORKDIR /usr/src/app
RUN go get -d github.com/joho/godotenv 
COPY go.mod .
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -o simple-webpage .

FROM alpine:3.12
ARG PORT
WORKDIR /app
RUN echo $PORT > .env
COPY --from=builder /usr/src/app/simple-webpage .
CMD ["./simple-webpage"]