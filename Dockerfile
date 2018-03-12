# Use node version 8.9.4
FROM node:8.9.4

# create and make working directory /usr/app
RUN mkdir -p /usr/app
WORKDIR /usr/app

# copy package.json and package-lock.json
COPY package*.json ./

# install npm packages
RUN npm install

# copy necessary files to /usr/app
COPY . .

# create .env file
RUN cp .env.sample .env

# export port 8000
EXPOSE 8000

CMD ["npm", "start"]