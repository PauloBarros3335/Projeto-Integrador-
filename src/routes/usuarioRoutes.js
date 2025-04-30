// routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const verificarToken = require("../middlewares/verificarToken");

// Rotas protegidas por token
router.get("/", verificarToken, usuarioController.listarUsuarios);
router.get("/:id", verificarToken, usuarioController.getUsuarioById);
router.put("/:id", verificarToken, usuarioController.atualizarUsuario);
router.delete("/:id", verificarToken, usuarioController.deletarUsuario);

module.exports = router;
