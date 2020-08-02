FROM ucenms-715-docker.artifactory.kasikornbank.com:8443/rhscl/nginx-112-rhel7:1-12
#base from alpine:3.7
MAINTAINER tran.b
USER root
RUN echo "cp --force /configmap/nginx.conf /opt/app-root/etc/nginx.default.d/nginx.conf && /usr/libexec/s2i/run" > /home/entrypoint.sh \
    && chmod 777 /home/entrypoint.sh
USER default
COPY ./dist /opt/app-root/src
ARG  BUILD_TIME
RUN  echo $BUILD_TIME > imagebuildtime.txt
EXPOSE 8080
CMD [ "/home/entrypoint.sh" ]
