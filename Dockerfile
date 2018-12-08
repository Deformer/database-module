FROM node:10

# Create app directory
RUN mkdir -p /usr/app
RUN chmod -R 777 /usr/app

WORKDIR /usr/app

# Copy code
COPY package.json /usr/app/
COPY . /usr/app

RUN npm install

# This is our secret sauce
RUN git clone https://github.com/vishnubob/wait-for-it.git