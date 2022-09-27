FROM node:18-alpine AS build
WORKDIR /app

ARG PNPM_VERSION=7.12.1
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME
RUN apk add --no-cache curl && \
  curl -fsSL "https://github.com/pnpm/pnpm/releases/download/v${PNPM_VERSION}/pnpm-linuxstatic-x64" -o /bin/pnpm && chmod +x /bin/pnpm && \
  apk del curl

COPY pnpm-lock.yaml ./
RUN pnpm fetch

ADD . ./
RUN pnpm install -r --offline

ARG API_URL
ENV VITE_API_URL=$API_URL

ARG CHAIN_ID
ENV VITE_API_URL=$CHAIN_ID

ARG REGISTRATION_FEE
ENV VITE_REGISTRATION_FEE=$REGISTRATION_FEE

RUN pnpm build

FROM nginx:1.23.1-alpine as production

COPY --from=build /app/build /usr/share/nginx/html
