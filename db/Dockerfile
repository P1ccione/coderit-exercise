FROM node:18-alpine
RUN npm install -g json-server
COPY ./db.json db.json
CMD ["json-server", "--watch", "./db.json", "--port", "5000", "--host", "0.0.0.0"]