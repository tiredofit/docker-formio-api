# tiredofit/formio-api

# Introduction

This will build a container for [Formio API Server](https://www.form.io/) A form server based on NodeJS.

This Container uses Debian Stretch as a base image along with NodeJS 9.2.0
Additional Components are Nginx to act as a reverse proxy.


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

 - You must use have an seperate MongoDB container instance setup for storage of data before running this container on its own.

# Installation

Automated builds of the image are available on [Docker Hub](https://hub.docker.com/tiredofit/formio) and is the 
recommended method of installation.


```bash
docker pull tiredofit/formio
```

# Quick Start

* The quickest way to get started is using [docker-compose](https://docs.docker.com/compose/). See the examples folder for a working 
[docker-compose.yml](examples/docker-compose.yml) that can be modified for development or production use.

* Set various [environment variables](#environment-variables) to understand the capabilities of this image.
* Map [persistent storage](#data-volumes) for access to configuration and data files for backup.

Once started, visit your defined hostname or IP Address and port and login using the values provided in the `ADMIN_EMAIL` and 
`ADMIN_PASS` variables below.


# Configuration

### Persistent Storage

| Parameter | Description |
|-----------|-------------|
| /app      | This is where the Form Server and source resides |

### Environment Variables

Along with the Environment Variables from the [Base image](https://hub.docker.com/r/tiredofit/debian) below is the complete list of 
available options that can be used to customize your installation.

| Parameter | Description |
|-----------|-------------|
| `ADMIN_EMAIL` | Administrator email for login e.g. `admin@example.com` |
| `ADMIN_PASS` | Password for login e.g. `password` |
| `DB_PORT` | MongoDB Port - Default `27017` |
| `DB_SECRET` | MongoDB Secret - Default `secret` |
| `JWT_SECRET` | JWT Secret - Default `secret` |
| `JWT_EXPIRETIME` | JWT Expire Time in Seconds - Default `240` |

#### DB Options
| Parameter | Description |
|-----------|-------------|
| `MYSQL_HOST` | (optional) MySQL Host e.g. `formio-mysql` |
| `MYSQL_PORT` | (optional) MySQL Server Port - Default `3306` |
| `MYSQL_DB_NAME` | (optional) MySQL DB Name - e.g. `formio-data` |
| `MYSQL_DB_USER` |ptional) MySQL DB UsernameName - e.g. `formio` |
| `MYSQL_DB_PASS` | (optional) MySQL DB Password - e.g. `password` |
| `MYSQL_PORT` | (optional) MySQL Server Port - Default `3306` |
| `MSSQL_HOST` | (optional) MSSQL Host e.g. `formio-mssql` |
| `MSSQL_PORT` | (optional) MSSQL Server Port - Default `1433` |
| `MSSQL_DB_NAME` | (optional) MSSQL DB Name - e.g. `formio-data` |
| `MSSQL_DB_USER` | (optional) MSSQL DB UsernameName - e.g. `formio` |
| `MSSQL_DB_PASS` | (optional) MSSQL DB Password - e.g. `password` |

#### Mail Options

| Parameter | Description |
|-----------|-------------|
| `MAIL_TYPE` | How to send email - Options are `sendgrid`, `gmail`, `mandrill` - Default `sendgrid` |
| `MAIL_USER` | Mail Username e.g. `username@example.com` |
| `MAIL_PASS` | Mail password e.g. `password` |
| `MAIL_SENDGRID_API_USER` | (optional) Sendgrid API User |
| `MAIL_SENDGRID_API_KEY` | (optional) Sendgrid API Key |
| `MAIL_GMAIL_USER` | (optional) Gmail Username |
| `MAIL_GMAIL_PASS` | (optional) Gmail Password |
| `MAIL_MANDRILL_API_KEY` | (optional) Mandrill API Key |

### Networking

The following ports are exposed.

| Port      | Description |
|-----------|-------------|
| `3001`    | NodeJS API Server |


# Maintenance
#### Shell Access

For debugging and maintenance purposes you may want access the containers shell. 

```bash
docker exec -it (whatever your container name is e.g. formio) bash
```

# References

* https://www.form.io/


