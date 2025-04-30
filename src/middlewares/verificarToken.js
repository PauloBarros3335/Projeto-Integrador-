// // src/middlewares/verificarToken.js
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     // 1. Pegar o token do header
//     const token = req.headers.authorization?.split(" ")[1]; // Formato: "Bearer <token>"

//     if (!token) {
//       return res.status(401).json({ mensagem: "Token não fornecido" });
//     }

//     // 2. Verificar o token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 3. Adicionar o ID do usuário à requisição
//     req.usuarioId = decoded.id;

//     next();
//   } catch (error) {
//     return res.status(401).json({ mensagem: "Token inválido ou expirado" });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("Headers recebidos:", req.headers); // Debug 1

    const authHeader = req.headers.authorization;

    // Verificação mais robusta do header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Token mal formatado ou ausente"); // Debug 2
      return res
        .status(401)
        .json({ mensagem: "Formato do token inválido. Use: Bearer <token>" });
    }

    const token = authHeader.split(" ")[1];

    // Verificação adicional do token
    if (!token || token.length < 50) {
      // Token JWT geralmente tem >50 chars
      console.log("Token inválido (tamanho ou formato)");
      return res.status(401).json({ mensagem: "Token inválido" });
    }

    // Verificação com mensagem de erro mais descritiva
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          console.log("Erro na verificação:", err.message); // Debug 3
          throw new Error(
            err.message.includes("expired")
              ? "Token expirado"
              : "Token inválido"
          );
        }
        return decoded;
      }
    );

    req.usuarioId = decoded.id;
    console.log("Token válido para usuário ID:", decoded.id); // Debug 4
    next();
  } catch (error) {
    console.error("Erro no middleware:", error.message); // Debug 5
    return res.status(401).json({
      mensagem: error.message || "Falha na autenticação",
      detalhes:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
