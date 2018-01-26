FROM nginx:1.13.8

MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

# Download latest release from github
RUN curl -s https://api.github.com/repos/oscp/cloud-selfservice-portal-frontend/releases/latest -k | grep "browser_download_url" | cut -d : -f 2,3 |
    tr -d \" | wget -qi -

RUN tar xfvz cloud-selfservice-portal-frontend.tar.gz && mv dist/* /usr/share/nginx/html && rm -f cloud-selfservice-portal-frontend.tar.gz

ADD start.sh /usr/share/nginx/start.sh
RUN chmod +x /usr/share/nginx/start.sh

# Fix permissions for OpenShift runtime
RUN chmod 777 /var/log/nginx /usr/share/nginx/html

CMD /usr/share/nginx/start.sh