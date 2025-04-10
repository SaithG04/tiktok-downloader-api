# Usa una imagen oficial de Node.js como base
FROM node:23-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto que usa tu aplicación (en este ejemplo, puerto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]