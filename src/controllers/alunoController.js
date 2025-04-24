const Aluno = require("../models/Aluno");

// Criar aluno
exports.createAluno = async (req, res) => {
  try {
    const { nome, matricula, curso, email } = req.body;
    const aluno = await Aluno.create({ nome, matricula, curso, email });
    res.status(201).json({ success: true, data: aluno });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Listar todos os alunos
exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.status(200).json({ success: true, data: alunos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar aluno por ID
exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res
        .status(404)
        .json({ success: false, error: "Aluno não encontrado." });
    }
    res.status(200).json({ success: true, data: aluno });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Atualizar aluno
exports.updateAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!aluno) {
      return res
        .status(404)
        .json({ success: false, error: "Aluno não encontrado." });
    }
    res.status(200).json({ success: true, data: aluno });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar aluno
exports.deleteAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) {
      return res
        .status(404)
        .json({ success: false, error: "Aluno não encontrado." });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
