FROM node:20-slim

WORKDIR /home/node/app

RUN apt-get update -y && apt-get install -y openssl
RUN yarn global add @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Criar o diretório dist e garantir permissões
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Construir o projeto como root
RUN yarn build

# Mudar o proprietário do dist novamente, se necessário
RUN chown -R node:node /home/node/app/dist

# Trocar para o usuário node após o build
USER node

CMD ["sh", "-c", "yarn start:dev"]
