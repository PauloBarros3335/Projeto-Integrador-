const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema(
  {
    nomeCompleto: {
      type: String,
      required: [true, "O nome completo é obrigatório."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "O e-mail é obrigatório."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, forneça um e-mail válido.",
      ],
    },
    cpf: {
      type: String,
      required: [true, "O CPF é obrigatório."],
      unique: true,
      trim: true,
      match: [
        /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
        "Por favor, forneça um CPF válido.",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", AlunoSchema);
