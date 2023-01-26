FROM golang:alpine AS builder
WORKDIR /usr/src/app
ARG PORT
COPY main.go go.mod ./
RUN echo "PORT=$PORT" > .env
RUN go get -d github.com/joho/godotenv
RUN CGO_ENABLED=0 GOOS=linux go build -o simple-webpage .


FROM alpine
WORKDIR /app
COPY --from=builder /usr/src/app /app
CMD ["./simple-webpage"]
