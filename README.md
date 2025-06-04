# 🚀 API de Certificados Digitais

![Node.js](https://img.shields.io/badge/Node.js-20.10.0-green)
![Express](https://img.shields.io/badge/Express-4.21.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.15.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📌 Visão Geral
API completa para geração e gerenciamento de certificados digitais em PDF com:

- ✔️ Autenticação JWT
- ✔️ Validação de certificados
- ✔️ Armazenamento seguro
- ✔️ Download automático

## 🛠️ Tecnologias
- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB
- **PDF**: pdf-lib
- **Autenticação**: JWT

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/certificado-api.git
cd certificado-api/backend

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env

# Inicie o servidor
npm run dev 


🔐 Variáveis de Ambiente
Variável	Descrição	Exemplo
MONGO_URI	URL do MongoDB	mongodb+srv://user:pass@cluster
PORT	Porta da API	5000
JWT_SECRET	Chave para tokens JWT	sua_chave_secreta
📋 Endpoints Principais
🔹 Certificados
Método	Endpoint	Descrição
POST	/api/certificados	Emite novo certificado
GET	/api/certificados/validar/:codigo	Valida certificado
GET	/api/certificados/download/:id	Faz download do PDF


POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@exemplo.com",
  "senha": "sua_senha"
}


🏗️ Estrutura do Projeto
backend/
├── src/
│   ├── controllers/     # Lógica dos endpoints
│   ├── models/          # Modelos do MongoDB
│   ├── routes/          # Definição de rotas
│   └── services/        # Geração de PDF
├── .env.example         # Modelo de variáveis
└── package.json         # Dependências


Exemplo de Uso

1. Emitir Certificado:

POST /api/certificados
Authorization: Bearer seu_token
Content-Type: application/json

{
  "alunoId": "507f1f77bcf86cd799439011",
  "cursoId": "5d6ede6a0ba62570afcedd3a"
}

2. Validar Certificado:

GET /api/certificados/validar/ABC123XY


🤝 Como Contribuir
Faça um fork do projeto

Crie sua branch (git checkout -b feature/incrivel)

Commit suas mudanças (git commit -m 'Add feature incrível')

Push para a branch (git push origin feature/incrivel)

Abra um Pull Request

📜 Licença
MIT - Veja LICENSE para detalhes
Desenvolvido com ❤️ por [Seu Nome] - [seu@email.com]


Este README.md está formatado com:
- Ícones visuais
- Seções claras
- Exemplos de código
- Badges de versão
- Tabelas organizadas
- Instruções passo a passo

Você pode personalizar com suas informações reais e adicionar mais detalhes específicos do seu projeto!
