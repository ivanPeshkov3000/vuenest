FROM node
RUN useradd - /bin/bash vuenest
USER vuenest
WORKDIR /mnt/app
EXPOSE 85