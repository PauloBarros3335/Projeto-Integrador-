const mongoose = require("mongoose");

const AlunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true,
    },
    matricula: {
      type: String,
      required: [true, "A matrícula é obrigatória."],
      unique: true,
    },
    curso: {
      type: String,
      required: [true, "O curso é obrigatório."],
    },
    email: {
      type: String,
      required: [true, "O e-mail é obrigatório."],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", AlunoSchema);
