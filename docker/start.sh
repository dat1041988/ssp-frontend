#!/bin/sh
echo 'starting nginx...'

# replace static values with environment-variables
if [ -n "$SSP_BACKEND_URL" ]; then
    sed -i "s#http://localhost:8000#$SSP_BACKEND_URL#g" /usr/share/nginx/html/main.*.js
fi
if [ -n "$WZU_BACKEND_URL" ]; then
    sed -i "s#http://localhost:8001#$WZU_BACKEND_URL#g" /usr/share/nginx/html/main.*.js
fi

# start webserver
exec nginx
