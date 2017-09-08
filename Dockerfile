FROM tiredofit/nodejs:6-latest
MAINTAINER Dave Conroy <dave at tiredofit dot ca>

### Install Build Dependencies
    RUN echo "@testing http://nl.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
        apk update && \
        apk add --virtual build-dependencies \
            gcc \
            git \
            g++ \
            make \
            musl-dev \
            && \

### Install Runtime Dependencies
        apk add \
            curl \
            python \
            yarn \
            && \

#### Install Haraka
        mkdir -p /app && \
        git clone https://github.com/formio/formio /app && \
        cd /app && \
        npm install && \


### Misc & Cleanup
            apk del --purge build-dependencies && \
            rm -rf /var/cache/apk/* /usr/src/*

### Add Files
    ADD install /

### Networking Configuration
    EXPOSE 3001 8080
