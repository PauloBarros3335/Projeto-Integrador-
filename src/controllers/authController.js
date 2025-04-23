const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificação básica
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ message: "Usuário já cadastrado com este e-mail." });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criação do usuário
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash,
    });

    await novoUsuario.save();

    // (Opcional) Gerar token JWT
    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Resposta
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
      token, // Se quiser já logar ao registrar
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor.",
      error: error.message,
    });
  }
};

module.exports = { registerUser };
