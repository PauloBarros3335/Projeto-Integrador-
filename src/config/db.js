// const mongoose = require("mongoose");
// require("dotenv").config({ path: "../../.env" }); // Garante que o .env da raiz do backend seja lido

// const connectDB = async () => {
//   try {
//     // Verifica se a MONGO_URI foi carregada
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI não definida no arquivo .env");
//     }
//     await mongoose.connect(process.env.MONGO_URI, {
//       // Opções useNewUrlParser e useUnifiedTopology são padrão agora, mas pode deixar por compatibilidade
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     });
//     console.log("MongoDB conectado com sucesso!");
//   } catch (error) {
//     console.error("Erro ao conectar ao MongoDB:", error.message);
//     process.exit(1); // Sai da aplicação em caso de erro na conexão
//   }
// };

// module.exports = connectDB;

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
