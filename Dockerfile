FROM node:12.18.2-alpine3.9

#Setting enviroment variables
ENV appDir /var/www/app
ENV NODE_ENV development

#Setting work directory
WORKDIR ${appDir}

# Create app directory
RUN mkdir -p $appDir
RUN apk add --no-cache git

# Install app dependencies while the images is builded
ADD package.json $appDir
RUN yarn

# Bundle app source
ADD . $appDir

# Compilate the app
RUN yarn run build

EXPOSE 20145

# Staring App
ENTRYPOINT ["node"]
CMD ["dist/server.js"]
