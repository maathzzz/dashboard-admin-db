# dashboard-admin-db

Painel Administrador - Projeto desenvolvido para o Curso de Ciência da Computação nas matérias de Engenharia de Software Aplicada, Princípios de Banco de Dados e Aplicações Digitais 🧑‍💻

## Requisitos
Antes de iniciar, certifique-se de ter os seguintes softwares instalados:

• Node.js: Necessário para rodar o backend. [Instale o Node.js](https://nodejs.org/pt) </br>
• Docker e Docker Compose: Necessário para rodar o banco de dados em containers. [Instale o Docker](https://www.docker.com/products/docker-desktop/)

Após as instalações, para garantir que Node.js e Docker estão instalados corretamente, execute os comandos abaixo no terminal:

```bash
# Verifique o Node.js
node -v
npm -v
```

```bash
# Verifique o Docker
docker -v
docker compose version
```

OBS. O node é instalado no seu sistema e pode ser acessado a qualquer momento, você precisa abrir o Docker Desktop para rodar os containers

## Instalando o Backend

1. Navegue até a pasta do backend:
```bash
cd dashboard-admin-db/backend
```

2. Instale as dependências do projeto (node_modules)
```bash
npm i
```

## Rodando o Banco de Dados com Docker

1. Certifique-se de que Docker está instalado e rodando.
2. Na pasta do projeto backend (onde está o arquivo `docker-compose.yml`), execute o comando para subir os containers do banco de dados:

```bash
docker compose up -d
```
Esse comando iniciará os containers em segundo plano. Você pode verificar se os containers estão rodando corretamente com:
```bash
docker ps
```

## Rodando o Projeto Backend

1. Com os containers do banco de dados rodando, vá até a pasta do backend:
```bash
cd dashboard-admin-db/backend
```

2. Execute o backend em modo de desenvolvimento:
```bash
npm run dev
```
O servidor backend estará agora rodando e conectado ao banco de dados gerenciado pelo Docker.

### Parando os Containers
Para parar os containers do banco de dados quando terminar:
```bash
docker compose down

```

## Rodando o Projeto Frontend

1. Vá até a pasta do frontend:
```bash
cd dashboard-admin-db/frontend
```

2. Instale as dependências do projeto (node_modules)
```bash
npm i
```

3. Execute o frontend em modo de desenvolvimento:
```bash
npm run dev
```

## Useful Commands
```bash
# To load a preview of the database in localhost
npx prisma studio
```
```bash
# To run a migration
npx prisma migrate dev --name init
```

## Contributing

Use [semantic commit messages:](https://www.conventionalcommits.org/)

- feat(context): nova funcionalidade para o usuário final;
- fix(context): correção de bug para o usuário final;
- docs(context): alterações na documentação;
- style(context): formatação, ponto e vírgula ausente, etc. - sem alterações no código de produção;
- refactor(context): refatoração do código de produção, ex.: renomeando uma variável;
- test(context): adicionando testes ausentes, refatorando testes - sem alterações no código de produção;
- chore(context): atualização de pacote, novo script de build, etc. - sem alterações no código de produção.

## License

[MIT](https://choosealicense.com/licenses/mit/)


