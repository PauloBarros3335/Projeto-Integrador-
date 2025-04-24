// src/middlewares/verificarToken.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Pegar o token do header
    const token = req.headers.authorization?.split(" ")[1]; // Formato: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    // 2. Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Adicionar o ID do usuário à requisição
    req.usuarioId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
};
