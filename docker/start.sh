#!/bin/sh

# replace static values with environment-variables
if [ -n "$SSP_BACKEND_URL" ]; then
    sed -i "s#http://localhost:8000/#$SSP_BACKEND_URL#g" /usr/share/nginx/html/bundle.js
fi

# start webserver
exec nginx