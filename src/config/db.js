// backend/src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI não disponível para a função connectDB.");
    }

    // Adicione AQUI o console.log para debug
    console.log(
      "Conectando ao MongoDB Atlas com URI:",
      process.env.MONGO_URI.replace(/\/\/[^@]+@/, "//<usuário>:<senha>@")
    ); // Ofusca credenciais

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
