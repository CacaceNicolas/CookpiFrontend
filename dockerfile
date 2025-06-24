FROM node:alpine AS builder
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
RUN npx ng build --configuration=production
 
FROM nginx:alpine
 
WORKDIR /app
 
COPY --from=builder /app/dist/cookpiFrontend/browser/* /usr/share/nginx/html
 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


