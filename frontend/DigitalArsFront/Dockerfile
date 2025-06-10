# Etapa de build
FROM node:20-alpine AS build
ARG VITE_API_URL  
ENV VITE_API_URL=$VITE_API_URL  
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de servidor estático con Node.js
FROM node:20-alpine
WORKDIR /app

# Instalar un servidor HTTP simple
RUN npm install -g serve

COPY --from=build /app/dist ./dist
EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
