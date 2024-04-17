FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy to the working directory
COPY . .

RUN npm install

RUN npm run build 


FROM httpd:latest

COPY --from=builder /app/dist /usr/local/apache2/htdocs/

COPY /production/.htaccess /usr/local/apache2/htdocs/

COPY /production/httpd.conf /usr/local/apache2/conf/
