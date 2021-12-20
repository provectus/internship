FROM golang:1.15 AS builder
WORKDIR /usr/src/app
RUN echo PORT=8888>./.env
COPY main.go .
COPY go.mod .
RUN go get -d github.com/joho/godotenv 
RUN CGO_ENABLED=0 GOOS=linux go build -o simple-webpage .

FROM scratch
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/simple-webpage /usr/src/app/.env ./
CMD ["./simple-webpage"]
