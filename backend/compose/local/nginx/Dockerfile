FROM nginx:1.14.0

COPY nginx.conf /etc/nginx/
RUN echo $(ls /etc/nginx/)
RUN echo $(nginx -t)