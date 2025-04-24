require("dotenv").config({ path: "./.env" });
const app = require("./app");
const PORT = process.env.PORT || 5000;

// Debug: Verifique as rotas após a inicialização
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Opcional: Listar rotas registradas (só funciona após app.listen)
  if (process.env.NODE_ENV !== "production") {
    console.log("Rotas disponíveis:");
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log(
          `${Object.keys(middleware.route.methods)[0].toUpperCase()} ${
            middleware.route.path
          }`
        );
      }
    });
  }
});

