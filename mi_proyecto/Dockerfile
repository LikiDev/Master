FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install cors express mongoose
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Bind your app to port
EXPOSE 3000

# CMD [ "node", ".\mi_proyecto\server2.js " ]
CMD [ "node", ".\mi_proyecto\server2.js" ]