#docker rm -f ksmemo
#docker pull docker.pkg.github.com/flamel2020/ksmemo/image:latest
#docker run --name ksmemo -p 3000:3000 -d docker.pkg.github.com/flamel2020/ksmemo/image:latest

docker run -d --name ksmemo -p 3000:3000 ksmemo
