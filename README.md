# github.com/tiredofit/docker-formio-api

[![Docker Pulls](https://img.shields.io/docker/pulls/tiredofit/formio-api.svg)](https://hub.docker.com/r/tiredofit/formio-api)
[![Docker Stars](https://img.shields.io/docker/stars/tiredofit/formio-api.svg)](https://hub.docker.com/r/tiredofit/formio-api)

## About

This will build a container for [Formio API Server](https://www.form.io/) A form server based on NodeJS.

This Container uses customized [Alpine](https://hub.docker.com/r/tiredofit/alpine) as a base image along with NodeJS 14.

[Changelog](CHANGELOG.md)

## Maintainer

- [Dave Conroy](https://github.com/tiredofit)

## Table of Contents

- [Introduction](#introduction)
- [Authors](#authors)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Persistent Storage](#persistent-storage)
  - [Environment Variables](#environment-variables)
    - [Mail Options](#mail-options)
  - [Networking](#networking)
- [Maintenance](#maintenance)
  - [Shell Access](#shell-access)
- [References](#references)

## Prerequisites and Assumptions

 - This image assumes that you are using a reverse proxy such as [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy) and
optionally the [Let's Encrypt Proxy Companion @
https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion) in
order to serve your pages. However, it will run just fine on it's own if you map appropriate ports.

 - You must use have an seperate MongoDB container instance setup for storage of data before running this container on its own.

## Installation

Automated builds of the image are available on [Docker Hub](https://hub.docker.com/r/tiredofit/formio-api) and is the
recommended method of installation.


```bash
docker pull tiredofit/formio-api
```

### Quick Start

* The quickest way to get started is using [docker-compose](https://docs.docker.com/compose/). See the examples folder for a working
[docker-compose.yml](examples/docker-compose.yml) that can be modified for development or production use.

* Set various [environment variables](#environment-variables) to understand the capabilities of this image.
* Map [persistent storage](#data-volumes) for access to configuration and data files for backup.

Once started, visit your defined hostname or IP Address and port and login using the values provided in the `ROOT_EMAIL` and
`ROOT_PASS` variables below.


## Configuration

### Persistent Storage


| Parameter        | Description                                    |
| ---------------- | ---------------------------------------------- |
| `/app/templates` | Drop your exported Form.IO json templates here |

### Environment Variables

Along with the Environment Variables from the [Base image](https://hub.docker.com/r/tiredofit/alpine) below is the complete list of
available options that can be used to customize your installation.


| Parameter          | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `PROJECT_TEMPLATE` | The project template to use (leave empty for default template) |
| `ROOT_EMAIL`       | Administrator email for login e.g. `admin@example.com`         |
| `ROOT_PASS`        | Password for login e.g. `password`                             |
| `DB_USER`          | Optional Database user for MongoDB e.g. `formio`               |
| `DB_PASS`          | Optional Database password for MongoDB e.g. `password`         |
| `DB_PORT`          | MongoDB Port - Default `27017`                                 |
| `DB_SECRET`        | MongoDB Encryption Secret - Default `secret`                   |
| `JWT_SECRET`       | JWT Secret - Default `secret`                                  |
| `JWT_EXPIRE_TIME`  | JWT Expire Time in Seconds - Default `240`                     |

#### Mail Options

| Parameter               | Description                                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EMAIL_TYPE`            | How to send email - Options are `sendgrid`, `mandrill` - Default `sendgrid`                                                                                                  |
| `EMAIL_USER`            | Sendgrid Mail Username e.g. `username@example.com`                                                                                                                           |
| `EMAIL_PASS`            | Sendgrid Mail password e.g. `password`                                                                                                                                       |
| `EMAIL_KEY`             | Mandrill API Key                                                                                                                                                             |
| `MAIL_SENDGRID_API_KEY` | (optional) Sendgrid API Key                                                                                                                                                  |
| `GMAIL_USER`            | (optional) Gmail Username                                                                                                                                                    |
| `GMAIL_PASS`            | (optional) Gmail Password                                                                                                                                                    |
| `MAIL_MANDRILL_API_KEY` | (optional) Mandrill API Key                                                                                                                                                  |
| `SMTP_HOST`             | Hostname of SMTP Server                                                                                                                                                      |
| `SMTP_SSL`              | Should SSL be used for connection to SMTP `TRUE` `FALSE`                                                                                                                     |
| `SMTP_USER`             | SMTP Username e.g. `username@example.com`                                                                                                                                    |
| `SMTP_PASS`             | SMTP password e.g. `password`                                                                                                                                                |
| `SMTP_PORT`             | SMTP Port                                                                                                                                                                    |
| `EMAIL_OVERRIDE`        | Ignore all options and use this: `# example: {"transport":"smtp","settings":{"port":2525,"host":"smtp.mailtrap.io","auth":{"user":"23esdffd53ac","pass":"324csdfsdf989a"}}}` |


### Networking

The following ports are exposed.

| Port   | Description       |
| ------ | ----------------- |
| `3001` | NodeJS API Server |


## Maintenance
### Shell Access

For debugging and maintenance purposes you may want access the containers shell.

```bash
docker exec -it (whatever your container name is e.g. formio) bash
```

## References

* https://www.form.io/

