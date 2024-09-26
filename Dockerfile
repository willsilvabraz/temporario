FROM node:20

WORKDIR /site/api
COPY Api-Tcc/package.json Api-Tcc/package-lock.json ./
RUN npm install
COPY Api-Tcc .

WORKDIR /site/front
COPY FrontEnd-Fila-Tcc/package.json FrontEnd-Fila-Tcc/package-lock.json ./
RUN npm install
COPY FrontEnd-Fila-Tcc .


EXPOSE 8080
EXPOSE 3000

RUN npm install -g concurrently

CMD concurrently "npm run start --prefix /site/api" "npm run start --prefix /site/front"
