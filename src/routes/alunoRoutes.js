

const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const verificarToken = require("../middlewares/verificarToken");

// Rotas CRUD para Alunos
router.post("/alunos", verificarToken, alunoController.createAluno);
router.get("/alunos", alunoController.getAlunos);
router.get("/alunos/:id", alunoController.getAlunoById);
router.put("/alunos/:id", verificarToken, alunoController.updateAluno);
router.delete("/alunos/:id", verificarToken, alunoController.deleteAluno);

module.exports = router;
