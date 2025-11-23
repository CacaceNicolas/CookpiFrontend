# --- BUILD ANGULAR ---
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli typescript

COPY . .
RUN ng build --configuration=production


# --- NGINX STAGE ---
FROM nginx:alpine

# Borramos config default si molestara
RUN rm -rf /usr/share/nginx/html/*

# Copiamos el build de Angular
COPY --from=build /app/dist/cookpiFrontend/browser /usr/share/nginx/html

# Copiamos un config custom para soportar rutas (importantísimo)
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
