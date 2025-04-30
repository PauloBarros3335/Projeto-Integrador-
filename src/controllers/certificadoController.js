const Certificado = require("../models/Certificado");
const Aluno = require("../models/Aluno");
const Curso = require("../models/Curso");
const mongoose = require("mongoose");

// Emitir certificado
exports.emitirCertificado = async (req, res) => {
  try {
    const { alunoId, cursoId } = req.body;

    // Validação: Verifica se aluno e curso existem
    const aluno = await Aluno.findById(alunoId);
    const curso = await Curso.findById(cursoId);

    if (!aluno || !curso) {
      return res.status(404).json({
        success: false,
        error: "Aluno ou curso não encontrado.",
      });
    }

    // Validação: Verifica se já existe certificado para esse aluno + curso
    const certificadoExistente = await Certificado.findOne({
      aluno: alunoId,
      curso: cursoId,
    });

    if (certificadoExistente) {
      return res.status(400).json({
        success: false,
        error: "Certificado já emitido para este aluno no curso selecionado.",
      });
    }

    const certificado = await Certificado.create({
      aluno: alunoId,
      curso: cursoId,
    });
    res.status(201).json({ success: true, data: certificado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Validar certificado por código
exports.validarCertificado = async (req, res) => {
  try {
    const { codigo } = req.params;
    const certificado = await Certificado.findOne({
      codigo_validacao: codigo,
    }).populate("aluno curso"); // Popula os dados do aluno e curso

    if (!certificado) {
      return res.status(404).json({
        success: false,
        error: "Certificado não encontrado ou código inválido.",
      });
    }

    res.status(200).json({ success: true, data: certificado });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar certificados de um aluno
exports.getCertificadosPorAluno = async (req, res) => {
  try {
    const certificados = await Certificado.find({ aluno: req.params.alunoId })
      .populate("curso")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: certificados });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Deletar certificado (apenas admin)
exports.deleteCertificado = async (req, res) => {
  try {
    const certificado = await Certificado.findByIdAndDelete(req.params.id);
    if (!certificado) {
      return res
        .status(404)
        .json({ success: false, error: "Certificado não encontrado." });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
