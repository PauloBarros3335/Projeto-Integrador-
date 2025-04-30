const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Debug: Verifica se a URI está sendo carregada
    console.log("Tentando conectar ao MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error(
        "❌ MONGO_URI não encontrada. Verifique seu arquivo .env"
      );
    }

    // Opções recomendadas pela documentação do Mongoose
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGO_URI, options);

    console.log("✅ MongoDB conectado com sucesso!");
    console.log(`📊 Banco: ${mongoose.connection.name}`);
    console.log(`🛠️  Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ ERRO DE CONEXÃO:", error.message);
    console.error("💡 Dica: Verifique:");
    console.error("- Se seu IP está autorizado no MongoDB Atlas");
    console.error("- Se o usuário/senha estão corretos");
    console.error("- Se o cluster está online");
    process.exit(1); // Encerra o processo com erro
  }
};

module.exports = connectDB;
