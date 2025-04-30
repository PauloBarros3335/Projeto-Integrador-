const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");
const verificarToken = require("../middlewares/verificarToken");

// Rotas CRUD para Cursos
router.post("/", verificarToken, cursoController.createCurso); // POST /api/cursos
router.get("/", cursoController.getCursos); // GET /api/cursos
router.get("/:id", cursoController.getCursoById); // GET /api/cursos/:id
router.put("/:id", verificarToken, cursoController.updateCurso); // PUT /api/cursos/:id
router.delete("/:id", verificarToken, cursoController.deleteCurso); // DELETE /api/cursos/:id

module.exports = router; // ← Exportação correta
