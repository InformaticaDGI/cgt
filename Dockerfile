# Multistage Dockerfile

FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build


FROM node:20-slim AS production
WORKDIR /app
COPY --from=base /app .
EXPOSE 5002
CMD ["yarn", "start"]