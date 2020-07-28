from centos:centos7

user root
workdir /

#RUN apk update && apk add nodejs npm && npm install -G pm2
# run yum update && \
#     yum install -y nodejs npm && \
#     yum clean all

RUN curl -LO https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz && \
    tar xvf node-v12.18.3-linux-x64.tar.xz && \
    rm node-v12.18.3-linux-x64.tar.xz && \
    mv node-v12.18.3-linux-x64 node && \
    cd node

ENV PATH $PATH:/node/bin

WORKDIR /ksmemo

copy index.js .
copy package.json .

RUN npm install && \
    npm install -g pm2
    
cmd pm2 start index.js && pm2 logs
