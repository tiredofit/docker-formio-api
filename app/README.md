# tiredofit/formio-app

# Introduction

This will build a container for [Formio Sample Apps](https://www.form.io/) to interace with a Form.IO Server. form server based on NodeJS.

This Container uses Debian:Stretch as a base. NodeJS 9.2.0 is running.


[Changelog](CHANGELOG.md)

# Authors

- [Dave Conroy](https://github.com/tiredofit)

# Table of Contents

- [Introduction](#introduction)
    - [Changelog](CHANGELOG.md)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
    - [Database](#database)
    - [Data Volumes](#data-volumes)
    - [Environment Variables](#environmentvariables)   
    - [Networking](#networking)
- [Maintenance](#maintenance)
    - [Shell Access](#shell-access)
   - [References](#references)

# Prerequisites
 
 - This image assumes that you are using a reverse proxy such as [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy) and 
optionally the [Let's Encrypt Proxy Companion @ 
https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion) in 
order to serve your pages. However, it will run just fine on it's own if you map appropriate ports.

You should also have an account on Form io or have installed the companion [API server image](https://hub.docker.com/r/tiredofit/formio-api)

# Installation

Automated builds of the image are available on [Docker Hub](https://hub.docker.com/tiredofit/formio-app) and is the 
recommended method of installation.


```bash
docker pull tiredofit/formio-app
```

# Quick Start

* The quickest way to get started is using [docker-compose](https://docs.docker.com/compose/). See the examples folder for a working 
[docker-compose.yml](examples/docker-compose.yml) that can be modified for development or production use.

* Set various [environment variables](#environment-variables) to understand the capabilities of this image.
* Map [persistent storage](#data-volumes) for access to configuration and data files for backup.

One started for the first time it will download dependencies and configure the application for usage providing you have persistent storage enabled.

# Configuration

### Persistent Storage

| Parameter | Description |
|-----------|-------------|
| /app      | This is where the App and source resides |

### Environment Variables

Along with the Environment Variables from the [Base image](https://hub.docker.com/r/tiredofit/debian) below is the complete list of 
available options that can be used to customize your installation.

| Parameter | Description |
|-----------|-------------|
| `REVERSE_PROXY` | Is this running behind a reverse proxy - Default `true` |
| `APP_HOST` | What is the applications hostname (make it the same as your URL)
| `API_HOST` | The hostname to your API server
| `APP`      | What Application would you like to install based on the form.io github repositories - Default `basic`

Sample App Options:

* `basic`, `eventsmanager`, `formbuilder`, `formio` `gpstracker`, `humanresources`, `movie` `prizedrawing`, `salesquote`, `servicetracker` , `todo

### Networking

The following ports are exposed.

| Port      | Description |
|-----------|-------------|
| `3000`    | Gulp Web  |
| `3001`    | BrowserSync Development Tester |




# Maintenance
#### Shell Access

For debugging and maintenance purposes you may want access the containers shell. 

```bash
docker exec -it (whatever your container name is e.g. formio-app) bash
```

# References

* https://www.form.io/


