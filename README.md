# General idea
Build Status: [![Build Status](https://travis-ci.org/oscp/cloud-selfservice-portal-frontend.svg?branch=master)](https://travis-ci.org/oscp/cloud-selfservice-portal-frontend)

This is the web UI for https://github.com/oscp/cloud-selfservice-portal-backend. For more information about the project see the readme of the backend.

# Installation & Documentation
## Self-Service Portal Frontend
```bash
# Create a OpenShift project for the frontend
oc new-project ose-selfservice-frontend

# Start the frontend with 
oc new-app <yourimage:version>
```

### Environment variables
**Param**|**Description**|**Example**
:-----:|:-----:|:-----:
SSP\_BACKEND\_URL|Specify the backend URL of the SSP-Backend|https://backend.ssp.com
WZU\_BACKEND\_URL|Optional: Specify the backend URL of the Tools Backend|https://tools-backend.ssp.com
