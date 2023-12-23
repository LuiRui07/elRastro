# syntax=docker/dockerfile:1

ARG NODE_VERSION=16.18.0

ARG PORT=5005 

FROM node:${NODE_VERSION}-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos relacionados con las dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala las dependencias de producción omitiendo las dependencias de desarrollo
RUN npm ci --only=production

# Copia el resto de los archivos fuente (código fuente de la aplicación)
COPY . .

# Expone el puerto en el que la aplicación escucha (ajusta según las necesidades)
EXPOSE ${PORT}

# Ejecuta la aplicación con el usuario no root "node"
USER node

# Comando predeterminado para iniciar la aplicación
CMD ["npm", "start"]



