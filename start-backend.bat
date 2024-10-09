@echo off
cd backend

:: Sobe os containers do Docker
docker-compose up -d

:: Roda o comando para iniciar o ambiente de desenvolvimento
npm run dev

pause
