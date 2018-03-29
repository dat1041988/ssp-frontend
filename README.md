# General idea
Build Status: [![Build Status](https://travis-ci.org/oscp/cloud-selfservice-portal-frontend.svg?branch=master)](https://travis-ci.org/oscp/cloud-selfservice-portal-frontend)

This is the web UI for https://github.com/oscp/cloud-selfservice-portal-backend. For more information about the project see the readme of the backend.

# Installation & Documentation
## Self-Service Portal Frontend
```bash
# Create a OpenShift project for the frontend
oc new-project ose-selfservice-frontend

# Start the frontend with
oc new-app -p SSP_BACKEND_URL=https://backend-url.com -f ssp-frontend-template.json
```

### Environment variables
**Param**|**Description**|**Example**
:-----:|:-----:|:-----:
SSP\_BACKEND\_URL|Specify the backend URL of the SSP-Backend|https://backend.ssp.com
WZU\_BACKEND\_URL|Optional: Specify the backend URL of the Tools Backend|https://tools-backend.ssp.com

# Contributing
For debugging purposes you can specify `--target builder`. Use `--build-arg http_proxy=` if you are using a proxy.
```
docker build --target builder -t ssp-frontend -f Dockerfile.multistage .
docker run -it --rm -v $(pwd):/tmp/ssp-frontend -p 8080:8080 ssp-frontend
```
