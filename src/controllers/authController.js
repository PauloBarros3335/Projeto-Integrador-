// src/controllers/authController.js
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Certifique-se que estas funções estão sendo exportadas
// const registerUser = async (req, res) => {
//   try {
//     const { nome, email, senha } = req.body;
//     const hashedPassword = await bcrypt.hash(senha, 10);
//     const usuario = await Usuario.create({
//       nome,
//       email,
//       senha: hashedPassword,
//     });

//     const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.status(201).json({ usuario, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // NÃO precisa fazer bcrypt.hash aqui!
    const usuario = await Usuario.create({
      nome,
      email,
      senha, // senha simples aqui, o pre('save') já vai criptografar
    });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({ usuario, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exportação CORRETA (isto é o que estava faltando)
module.exports = {
  registerUser,
  loginUser,
};
