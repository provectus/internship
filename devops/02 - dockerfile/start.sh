#!/bin/bash

export HOST=$(hostname -I)
/usr/local/bin/node app.js -DFOREGROUND
