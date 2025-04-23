// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config({ path: "../../.env" });

// // Importar rotas (ainda vazias ou não criadas)
// // const alunoRoutes = require('./routes/alunos');

// const app = express();

// // Conectar ao DB
// connectDB();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rota de Teste
// app.get("/", (req, res) => {
//   res.send("API Backend está no ar!");
// });

// // Montar Rotas (exemplo)
// // app.use('/api/alunos', alunoRoutes);

// module.exports = app;

// backend/src/app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Importa a função de conexão
// REMOVEU o dotenv.config daqui

// Importar rotas (ainda sem rotas reais implementadas)
// const alunoRoutes = require('./routes/alunos');

const app = express();

// Middlewares essenciais
app.use(cors()); // Permite requisições de outros domínios (seu frontend)
app.use(express.json()); // Permite o servidor entender JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permite entender dados de formulários

// Conectar ao Banco de Dados (chamada da função importada)
connectDB();

// Rota de Teste inicial
app.get("/", (req, res) => {
  res.send("API Backend Certificados está funcionando!");
});

// Montar as Rotas da API (descomentar e criar os arquivos depois)
// app.use('/api/alunos', alunoRoutes);
// app.use('/api/cursos', cursoRoutes);
// ... outras rotas ...

module.exports = app;
