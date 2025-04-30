// const mongoose = require("mongoose");

// const AlunoSchema = new mongoose.Schema(
//   {
//     nome_completo: {
//       type: String,
//       required: [true, "O nome completo é obrigatório."],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "O e-mail é obrigatório."],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/.+\@.+\..+/, "E-mail inválido."],
//     },
//     cpf: {
//       type: String,
//       required: [true, "O CPF é obrigatório."],
//       unique: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Aluno", AlunoSchema);

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
      match: [/.+\@.+\..+/, "E-mail inválido."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", AlunoSchema);
