# Multistage Dockerfile

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn --frozen-lockfile
COPY . .

ARG VITE_ENV
ARG VITE_APP_ID
ARG PORT
ARG TAGNAME

RUN echo "VITE_ENV=${VITE_ENV}" > .env && \
    echo "VITE_APP_ID=${VITE_APP_ID}" >> .env


RUN yarn build


FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG PORT

EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]