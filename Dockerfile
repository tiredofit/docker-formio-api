FROM tiredofit/nodejs:6-latest
LABEL maintainer="Dave Conroy (dave at tiredofit dot ca)"

### Disable Build in Services
    ENV ENABLE_SMTP=FALSE
    
### Install Runtime Dependencies
    RUN apk update && \
        apk add \
            expect \
            jq \
            nginx \
            python \
            yarn && \

### Misc & Cleanup
        rm -rf /var/cache/apk/* /usr/src/*

### Add Files
    ADD install /

### Networking Configuration
    EXPOSE 80 3001 8080
