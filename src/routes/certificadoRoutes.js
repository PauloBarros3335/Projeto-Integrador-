// const express = require("express");
// const router = express.Router();
// const certificadoController = require("../controllers/certificadoController");
// const verificarToken = require("../middlewares/verificarToken");

// // Rotas protegidas por token
// router.post(
//   "/certificados",
//   verificarToken,
//   certificadoController.emitirCertificado
// );
// router.delete(
//   "/certificados/:id",
//   verificarToken,
//   certificadoController.deleteCertificado
// );

// // Rotas públicas
// router.get(
//   "/certificados/validar/:codigo",
//   certificadoController.validarCertificado
// );
// router.get(
//   "/certificados/aluno/:alunoId",
//   certificadoController.getCertificadosPorAluno
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const certificadoController = require("../controllers/certificadoController");
const verificarToken = require("../middlewares/verificarToken");

// Rotas protegidas por token
router.post("/", verificarToken, certificadoController.emitirCertificado); // ← Removido "/certificados"
router.delete("/:id", verificarToken, certificadoController.deleteCertificado);

// Rotas públicas
router.get("/validar/:codigo", certificadoController.validarCertificado);
router.get("/aluno/:alunoId", certificadoController.getCertificadosPorAluno);

module.exports = router;
