FROM nginx:1.13.8

MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

# Install build deps
RUN apt-get update && apt-get install -y wget curl

# Download latest release from github
RUN curl -s https://api.github.com/repos/oscp/cloud-selfservice-portal-frontend/releases/latest -k \
  | grep "browser_download_url" | cut -d : -f 2,3 | tr -d \" | wget -qi -

RUN ls -la && tar xfvz self-service-portal-frontend.tar.gz && mv dist/* /usr/share/nginx/html && rm -f self-service-portal-frontend.tar.gz

ADD nginx.conf /etc/nginx/nginx.conf
ADD start.sh /usr/share/nginx/start.sh
RUN chmod +x /usr/share/nginx/start.sh

# Fix permissions for OpenShift runtime (random user)
RUN chmod 777 /var/log/nginx /usr/share/nginx/html /var/cache/nginx/

# Remove build deps
RUN apt-get purge -y --auto-remove wget curl

EXPOSE 8080

CMD /usr/share/nginx/start.sh