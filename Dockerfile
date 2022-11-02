# Step 1 specify the base image
FROM node

WORKDIR /thehawk

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 8000