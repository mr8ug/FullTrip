#version de docker
FROM node:16

# Creando el espacio de trabajo
WORKDIR /app



# Copiado archivos de dependencia y librerias par para el servicio
COPY package.json ./
COPY package-lock.json ./

# ejecutando para cargar dependencia de produccion
RUN npm install --omit=dev

#copiando todo el codigo
COPY . .

#Levantando aplicacion
CMD ["npm", "start"]