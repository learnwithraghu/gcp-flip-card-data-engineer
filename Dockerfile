FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html style.css script.js ./ 
COPY data ./data

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

