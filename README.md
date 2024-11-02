# Gerenciamento de Telefones

Este projeto é uma aplicação de gerenciamento de telefones onde os usuários podem criar contas, autenticar-se, e gerenciar seus telefones, com a possibilidade de adicionar, atualizar, deletar e marcar telefones como roubados. Quando um telefone é marcado como roubado, seu status é enviado para o Redis, permitindo notificação em tempo real.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações eficientes e escaláveis do lado do servidor.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados dos telefones e usuários.
- **Redis**: Utilizado para publicar eventos em tempo real, como o status de um telefone marcado como roubado.
- **Handlebars**: Motor de template para renderizar o frontend da aplicação.
- **TypeScript**: Linguagem utilizada para o desenvolvimento da aplicação.
  
## Funcionalidades

- **Autenticação de Usuários**: Sistema de autenticação com suporte para login e controle de sessão.
- **Criação de Usuário**: Permite o registro de novos usuários na plataforma.
- **Adicionar Telefone**: Permite a criação de um novo telefone com dados como número, modelo, marca, IMEI, entre outros.
- **Editar Telefone**: Atualiza as informações de um telefone já existente.
- **Marcar como Roubado**: Permite marcar um telefone como roubado e registrar a localização.
- **Deletar Telefone**: Remove permanentemente um telefone do banco de dados.
- **Publicação de Eventos via Redis**: Quando um telefone é marcado como roubado, as informações são enviadas para o Redis.
  
## Instalação

1. Clone o repositório:

   ```bash
   git clone git@github.com:bodescorp/API_Phone_stream.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd API_Phone_stream
   ```

3. Instale as dependências usando o **npm** ou **yarn**:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure as variáveis de ambiente no arquivo `.env`. Veja o exemplo de configuração no `.env.example`:

   ```
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=seu_redis_password
   MONGO_URI=mongodb://localhost:27017/telefone-db
   JWT_SECRET=sua_chave_secreta_jwt
   JWT_EXPIRATION_TIME=
   SESSION_SECRET=

   ```

5. Execute o servidor:

   ```bash
   npm run start
      # ou
   yarn start 
   ```




## Instalação com Docker Compose

1. Clone o repositório:

   ```bash
   git clone git@github.com:bodescorp/API_Phone_stream.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd API_Phone_stream
   ```

3. Configure as variáveis de ambiente no arquivo `.env`. Veja o exemplo de configuração no `.env.example`:

   ```dotenv
   REDIS_HOST=redis
   REDIS_PORT=6379
   MONGO_URI=mongodb://mongo:27017/telefone-db
   JWT_SECRET=sua_chave_secreta_jwt
   ```

4. Execute o Docker Compose:

   ```bash
   docker-compose up -d
   ```

   Isso iniciará todos os serviços definidos, incluindo a aplicação, o MongoDB e o Redis.

5. Acesse a aplicação em `http://localhost:3000/views/auth/login`.
  

## Estrutura do Projeto

- `src/`
  - **app/**
    - `phone/`: Contém o módulo relacionado ao gerenciamento de telefones.
    - `auth/`: Módulo de autenticação, incluindo guardas e interceptores.
    - `tenant/`: Middleware para multitenancy.
    - `redis/`: Serviço para integração com o Redis.
    - `db/`: Serviço para integração com o Mongo Atlas.
    - `user/`: Módulo responsável pela criação e gerenciamento de usuários.
  - **dto/**: Contém os DTOs usados para validar e transferir dados da aplicação.
  - **services/**: Contém os serviços para realizar as operações de banco de dados e redis.
  - **views/**: Contém as views em Handlebars para renderizar o frontend.
  
## Como Usar

### Registro e Autenticação

1. **Registro de Usuário**: Envie uma requisição para `POST /user/` com os dados do usuário (exemplo de JSON abaixo).
   
   ```json
   {
     "username": "exampleUser",
     "password": "examplePassword"
   }
   ```

2. **Login**: Envie uma requisição para `POST /auth/` com as credenciais de login. Após a autenticação, um token JWT será gerado e armazenado na sessão do usuário.

### Gerenciamento de Telefones

#### Adicionar um Telefone


Na interface web, [add phone](http://localhost:3000/views/phone/list) clique em **"Adicionar Novo Telefone"**, preencha o formulário com os dados do telefone, e clique em **"Salvar"**.

#### Editar um Telefone

Na lista de telefones, clique em **"Editar"** para modificar os dados de um telefone já existente.

#### Marcar como Roubado

Clique no botão **"Marcar como Roubado"** para abrir um modal onde você poderá inserir a localização do telefone roubado. As informações serão atualizadas e publicadas no Redis.

#### Deletar um Telefone

Clique em **"Deletar"** ao lado do telefone que você deseja remover. Haverá uma confirmação antes de completar a exclusão.

## Exemplo de DTO

Aqui está um exemplo de um DTO utilizado para o gerenciamento de telefones:

```typescript
export class PhoneDto {
  id?: string;
  phone_number: string;
  phone_model: string;
  brand: string;
  imei: string;
  status?: 'Ativo' | 'Roubado' | 'Desativado';
  isStolen?: boolean;
  point?: {
    type: 'Point';
    coordinates: [number, number];
  };
  userId: string;
}
```

## Integração com Redis

Para integrar com o Redis, o serviço `RedisService` é usado para publicar e consumir eventos, como quando um telefone é marcado como roubado.

Exemplo de publicação de evento:

```typescript
async markAsStolen(id: string, updatePhoneStatusDto: UpdatePhoneStatusDto): Promise<PhoneDto> {
  const phoneStolen = await this.phoneModel.findOneAndUpdate({ _id: id },
    { ...updatePhoneStatusDto, isStolen: true, status: 'Roubado' },
    { new: true }
  ).exec();

  await this.redisService.publish('phone-stolen', {
    id,
    number: phoneStolen.phone_number,
    imei: phoneStolen.imei,
    status: phoneStolen.status,
    point: phoneStolen.point
  });

  return this.findOne(id);
}
```

## Contribuição

Se você quiser contribuir com este projeto, sinta-se à vontade para abrir issues ou enviar pull requests.

