FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --configuration=production

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf || true
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/cookpiFrontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
