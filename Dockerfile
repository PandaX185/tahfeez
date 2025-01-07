FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

FROM node:alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

RUN npx prisma generate

CMD ["npm", "start"]