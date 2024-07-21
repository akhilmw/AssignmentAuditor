FROM node:22-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the project dependencies
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]