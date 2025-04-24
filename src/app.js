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

// Rotas
const authRoutes = require("./routes/authRoutes");
const alunoRoutes = require("./routes/alunoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", alunoRoutes);

// Rota básica de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

module.exports = app;
