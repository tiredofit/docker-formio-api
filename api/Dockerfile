FROM tiredofit/nodejs:9-debian-latest
LABEL maintainer="Dave Conroy (dave at tiredofit dot ca)"

### Disable Build in Services
    ENV ENABLE_SMTP=FALSE \
        ENABLE_CRON=FALSE

### Install Runtime Dependencies
    RUN apt-get update && \
        apt-get install -y \
                expect \
                jq \
                sudo \
                && \

### Misc & Cleanup
       apt-get -y autoremove && \
       apt-get clean && \
       rm -rf /var/lib/apt/lists/*

### Add Files
    ADD install /

### Networking Configuration
    EXPOSE 3001 
