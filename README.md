# GamerVibe-Website
Basics in web development project

Quick set-up
$ npm -i

Generate keys and certificate (below for local version)
$ openssl genrsa -out ssl-key.pem 2048
$ openssl req -new -key ssl-key.pem -out certrequest.csr
$ openssl x509 -req -in certrequest.csr -signkey ssl-key.pem -out ssl-cert.pem

$ touch .env
DB_HOST
DB_USER
DB_PASS
DB_NAME
PROXY_PASS
HTTPS_PORT
HTTP_PORT

$ node app.js


Database design
![database deisgn](./database/database.png)
