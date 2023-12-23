# Usa la imagen oficial de Node como base
FROM node:16.18.0-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos relacionados con las dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos fuente (código fuente de la aplicación)
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará (ajusta según las necesidades)
EXPOSE 3000

# Comando predeterminado para iniciar la aplicación
CMD ["npm", "start"]
