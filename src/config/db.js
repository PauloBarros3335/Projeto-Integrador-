// backend/src/config/db.js
const mongoose = require("mongoose");
// REMOVEU o dotenv.config daqui

const connectDB = async () => {
  try {
    // A MONGO_URI já deve estar em process.env por causa do server.js
    if (!process.env.MONGO_URI) {
      // Checagem extra nunca é demais
      throw new Error("MONGO_URI não disponível para a função connectDB.");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    // Se o erro for de autenticação, a senha/usuário podem estar errados no .env
    // Se for DNS/timeout, o cluster url ou Network Access podem estar errados
    process.exit(1);
  }
};

module.exports = connectDB;
