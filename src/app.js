

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Configurações básicas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco
connectDB();

// Importação de todas as rotas
const alunoRoutes = require("./routes/alunoRoutes");
const authRoutes = require("./routes/authRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const certificadoRoutes = require("./routes/certificadoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes"); // Nova importação

// Configuração das rotas
app.use("/api/auth", authRoutes);
app.use("/api", alunoRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/certificados", certificadoRoutes);
app.use("/api/usuarios", usuarioRoutes); // Nova rota adicionada

// Rota básica de teste
app.get("/", (req, res) => {
  res.send(
    "API funcionando! Consulte a documentação para as rotas disponíveis."
  );
});

// Middleware para tratamento de erros 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
    error: `O endpoint ${req.method} ${req.url} não existe`,
  });
});

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Erro interno no servidor",
    error: err.message,
  });
});

module.exports = app;
