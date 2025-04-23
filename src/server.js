require("dotenv").config({ path: "./.env" });

// ****** ADICIONE ESTA LINHA DE DEBUG ******
console.log("Conteúdo de process.env.PORT após dotenv:", process.env.PORT);
console.log(
  "Conteúdo de process.env.MONGO_URI após dotenv:",
  process.env.MONGO_URI
);
// *******************************************

// Validação simples se MONGO_URI foi carregada (opcional, mas útil)
if (!process.env.MONGO_URI) {
  console.error(
    "ERRO FATAL: MONGO_URI não encontrada no .env. Verifique o arquivo .env e o caminho no dotenv.config()."
  );
  process.exit(1);
}

const app = require("./app"); // Importa o app DEPOIS de carregar .env

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
