# dashboard-admin-db

CRUD Admin para manipular dados em um banco de dados 🧑‍💻

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
2. Na pasta raiz do projeto (onde está o arquivo `docker-compose.yml`), execute o comando para subir os containers do banco de dados:

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

## License

[MIT](https://choosealicense.com/licenses/mit/)
 @ Unisagrado
