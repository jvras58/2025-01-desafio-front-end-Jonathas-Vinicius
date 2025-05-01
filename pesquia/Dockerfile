FROM node:lts-alpine3.21 AS deps
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma
RUN npm install

FROM node:lts-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY . .
RUN npm run build
RUN rm -rf node_modules/.prisma node_modules/@prisma/engines
ENV SKIP_PRISMA_GENERATE=true
RUN npm install --omit=dev
RUN npx prisma generate
RUN npm prune --production

FROM node:lts-alpine3.21 AS prod
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]