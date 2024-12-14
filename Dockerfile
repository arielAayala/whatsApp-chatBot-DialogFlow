# Image size ~ 400MB
FROM node:21-alpine3.18 as builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Copiar los archivos de dependencias y luego instalar las dependencias
COPY package*.json *-lock.yaml ./
RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && apk add --no-cache git \
    && pnpm install \
    && apk del .gyp

FROM node:21-alpine3.18 as deploy

WORKDIR /app

ARG PORT
ENV PORT $PORT
EXPOSE $PORT

# Copiar solo los archivos necesarios para producción
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/*.json /app/*-lock.yaml ./
COPY --from=builder /app/src ./src   
# Asegúrate de copiar la carpeta src con tu app.js

RUN corepack enable && corepack prepare pnpm@latest --activate 
ENV PNPM_HOME=/usr/local/bin

# Instalar dependencias de producción
RUN npm cache clean --force && npm install --production --ignore-scripts \
    && addgroup -g 1001 -S nodejs && adduser -S -u 1001 nodejs \
    && rm -rf $PNPM_HOME/.npm $PNPM_HOME/.node-gyp

# Asegúrate de que el archivo app.js se ejecute correctamente
CMD ["node", "src/app.js"]
