###################################################
# Dockerfile to build OpenWAF-UI container images #
# Based on jessie                                 #
###################################################

#Set the base image to jessie
FROM debian:jessie

#File Author
MAINTAINER Miracle

#Docker Build Arguments
ARG OPENWAF_UI_VERSION="0.1.1"
ARG OPENWAF_UI_PREFIX="/opt"
ARG NODEJS_VERSION="v10.12.0"
ARG ANGULAR_CLI_VERSION="6.2.5"

RUN apt-get update \
    && apt-get install wget xz-utils -y

# Install OpenWAF-UI
RUN cd ${OPENWAF_UI_PREFIX} \
    && apt-get install git nginx -y \
    && git clone https://github.com/titansec/OpenWAF-UI \
    && cp OpenWAF-UI/nginx/* /etc/nginx/sites-enabled/ 

CMD ["nginx", "-g", "daemon off;"]