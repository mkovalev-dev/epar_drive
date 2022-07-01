FROM node:16.7.0-alpine

ARG APP_HOME=/app
WORKDIR ${APP_HOME}

ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node ./package.json ./package-lock.json /${APP_HOME}/
RUN chown -R node:node ${APP_HOME}
USER node
RUN npm install


CMD ["npm", "start"]