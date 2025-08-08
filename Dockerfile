# Multistage Dockerfile

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn --frozen-lockfile
COPY . .

ARG VITE_APP_ID
ARG VITE_ENV

RUN echo "VITE_APP_ID=${VITE_APP_ID}" > .env \
    && echo "VITE_ENV=${VITE_ENV}" >> .env

RUN yarn build


FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]