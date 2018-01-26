FROM nginx:1.13.8

# Download latest release from github
RUN curl -s https://api.github.com/repos/oscp/cloud-selfservice-portal-frontend/releases/latest -k | grep "browser_download_url" | cut -d : -f 2,3 |
    tr -d \" | wget -qi -

RUN tar xfvz cloud-selfservice-portal-frontend.tar.gz && cp dist/* /usr/share/nginx/html
