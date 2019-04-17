FROM tiredofit/nodejs:10-latest  // where is this????
LABEL maintainer="Dave Conroy (dave at tiredofit dot ca)"

### Disable Build in Services
    ENV FORMIO_VERSION=v1.33.5 \
        FORMIO_CLIENT_VERSION=master \
        ENABLE_SMTP=FALSE \
        ENABLE_CRON=FALSE \
        ZABBIX_HOSTNAME=formio-api-app

### Install Runtime Dependencies
    RUN apk update && \
        apk add \
            expect \
            git \
            g++ \
            jq \
            make \
            python \
            && \
        \
        sudo -u nodejs git clone -b $FORMIO_VERSION https://github.com/formio/formio.git /app/ && \
        sudo -u nodejs git clone -b $FORMIO_CLIENT_VERSION https://github.com/formio/formio-app-formio.git /app/client && \
        \
        cd /app && \
        sudo -u nodejs npm install && \

### Misc & Cleanup
        mkdir -p /app/templates && \
        chown -R nodejs. /app && \
        rm -rf /tmp/* \
        /var/cache/apk/*

    WORKDIR /app/

### Networking Configuration
    EXPOSE 3001 

### Add Files
    ADD install /

