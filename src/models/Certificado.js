const mongoose = require("mongoose");

const CertificadoSchema = new mongoose.Schema(
  {
    aluno: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aluno",
      required: true,
    },
    curso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      required: true,
    },
    codigo_validacao: {
      type: String,
      required: true,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 10).toUpperCase(), // Gera um código aleatório
    },
  },
  { timestamps: true }
);

// Impede certificados duplicados (mesmo aluno + curso)
CertificadoSchema.index({ aluno: 1, curso: 1 }, { unique: true });

module.exports = mongoose.model("Certificado", CertificadoSchema);
