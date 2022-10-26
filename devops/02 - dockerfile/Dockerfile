# tagged as builder

FROM golang:1.15 AS builder
WORKDIR /usr/src/app
COPY main.go .

# copy and downloading go dependecies fromm go.mod file.
COPY go.mod .
RUN go mod download

# 
COPY .env .
# below address of godotenv is added as binary. old address was as library which we don't need. 
RUN go get -d -v github.com/joho/godotenv/cmd/godotenv 
# RUN go get -d github.com/joho/godotenv 
RUN CGO_ENABLED=0 GOOS=linux go build -o simple-webpage .


# another stage added and copies the binary file from prebiew stage
FROM alpine
WORKDIR /app
COPY --from=builder /usr/src/app /app/
CMD ["./simple-webpage"]
# we can expose incase of inter-container connection, also this is a hint to show on which port our app is running.
EXPOSE 8888



