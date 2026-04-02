FROM node:24

EXPOSE ${PORT}

WORKDIR /app/backend

RUN mkdir -p /app/logs
RUN printf "Application logs:\n" > /app/logs/app.log

COPY backend .
RUN npm install

ENTRYPOINT ["npm", "start"]
