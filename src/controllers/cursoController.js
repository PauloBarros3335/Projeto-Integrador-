const Curso = require("../models/Curso");
const mongoose = require("mongoose");

// Criar curso
exports.createCurso = async (req, res) => {
  try {
    const { nome_curso, carga_horaria, descricao, data_inicio, data_fim } =
      req.body;

    // Validação: Data de fim não pode ser anterior à data de início
    if (new Date(data_fim) <= new Date(data_inicio)) {
      return res.status(400).json({
        success: false,
        error: "A data de término deve ser posterior à data de início.",
      });
    }

    const curso = await Curso.create({
      nome_curso,
      carga_horaria,
      descricao,
      data_inicio,
      data_fim,
    });

    res.status(201).json({ success: true, data: curso });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Listar todos os cursos
exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ data_inicio: -1 }); // Ordena por data mais recente
    res.status(200).json({ success: true, data: cursos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar curso por ID
exports.getCursoById = async (req, res) => {
  try {
    // Validação: Verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, error: "ID do curso inválido." });
    }

    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res
        .status(404)
        .json({ success: false, error: "Curso não encontrado." });
    }
    res.status(200).json({ success: true, data: curso });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Atualizar curso
exports.updateCurso = async (req, res) => {
  try {
    const { data_inicio, data_fim } = req.body;

    // Validação: Data de fim não pode ser anterior à data de início
    if (
      data_fim &&
      data_inicio &&
      new Date(data_fim) <= new Date(data_inicio)
    ) {
      return res.status(400).json({
        success: false,
        error: "A data de término deve ser posterior à data de início.",
      });
    }

    const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retorna o documento atualizado
      runValidators: true, // Executa validações do schema
    });

    if (!curso) {
      return res
        .status(404)
        .json({ success: false, error: "Curso não encontrado." });
    }
    res.status(200).json({ success: true, data: curso });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar curso
exports.deleteCurso = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) {
      return res
        .status(404)
        .json({ success: false, error: "Curso não encontrado." });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
