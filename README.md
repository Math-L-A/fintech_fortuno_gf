
# Fintech Fortuno — Instruções básicas

Este projeto contém um backend em Spring Boot (`backend/`) e um frontend em React (`frontend/fintech-frontend`).

## 1) Iniciar o backend

No PowerShell, a partir da pasta `backend`:

```powershell
cd backend
.\mvnw -DskipTests package
.\mvnw spring-boot:run
# ou: java -jar target\backend-0.0.1-SNAPSHOT.jar
```

## 2) Iniciar o frontend

No PowerShell, a partir da pasta do frontend:

```powershell
cd frontend\fintech-frontend
npm install
npm start
# ou para build: npm run build
```

## 3) Usuário de teste (login)

- Email: curltest@example.com
- Senha: 123456

> Observação: caso o usuário de teste não exista no banco, crie um usuário pelo frontend (Usuários → Novo) ou via POST `/usuarios` no backend.

## Importante

Para visualizar os dados (páginas de detalhes/edição), é necessário cadastrar-se e efetuar o login.

