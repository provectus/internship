#!/bin/bash
echo 127.0.0.1 flaskapp >> /etc/hosts
helm install provectus ./umbrella/
sleep 60
curl flaskapp:80
