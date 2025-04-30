const mongoose = require("mongoose");

const CursoSchema = new mongoose.Schema(
  {
    nome_curso: {
      type: String,
      required: [true, "O nome do curso é obrigatório."],
      trim: true,
    },
    carga_horaria: {
      type: Number,
      required: [true, "A carga horária é obrigatória."],
      min: [1, "Carga horária mínima: 1 hora."],
    },
    descricao: {
      type: String,
      trim: true,
    },
    data_inicio: {
      type: Date,
      required: true,
    },
    data_fim: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.data_inicio; // Valida se data_fim > data_inicio
        },
        message: "Data de término deve ser posterior à data de início.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Curso", CursoSchema);
