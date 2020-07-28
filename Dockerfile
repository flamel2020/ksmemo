FROM node:slim

USER root
WORKDIR /ksmemo

COPY index.js .
CMD node index.js