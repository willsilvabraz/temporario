FROM node:20

WORKDIR /site/api
COPY Api-Tcc/package.json Api-Tcc/package-lock.json ./
RUN npm install
COPY Api-Tcc .
RUN npm start
EXPOSE 8080

WORKDIR /site/front
COPY FrontEnd-Fila-Tcc/package.json FrontEnd-Fila-Tcc/package-lock.json ./
RUN npm install
COPY FrontEnd-Fila-Tcc .
RUN Npm start
EXPOSE 3000

