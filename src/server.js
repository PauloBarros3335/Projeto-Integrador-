// Carrega as variáveis de ambiente PRIMEIRO
require("dotenv").config({ path: `${__dirname}/../.env` });

// Debug: Verifica se as variáveis estão carregadas
console.log("Variáveis carregadas:", {
  MONGO_URI: process.env.MONGO_URI ? "***" : "NÃO ENCONTRADA",
  PORT: process.env.PORT || "5000 (padrão)",
});

const app = require("./app");
const connectDB = require("./config/db");

// Conecta ao banco e inicia o servidor
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});
