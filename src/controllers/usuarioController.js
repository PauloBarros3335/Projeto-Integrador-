// controllers/usuarioController.js
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

// Listar todos os usuários (apenas admin)
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-senha"); // Exclui a senha do retorno
    res.status(200).json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar usuário por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-senha");
    if (!usuario) {
      return res
        .status(404)
        .json({ success: false, error: "Usuário não encontrado." });
    }
    res.status(200).json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Atualizar usuário
exports.atualizarUsuario = async (req, res) => {
  try {
    // Se estiver atualizando a senha, faz o hash
    if (req.body.senha) {
      req.body.senha = await bcrypt.hash(req.body.senha, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-senha");

    if (!usuario) {
      return res
        .status(404)
        .json({ success: false, error: "Usuário não encontrado." });
    }
    res.status(200).json({ success: true, data: usuario });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deletar usuário
exports.deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res
        .status(404)
        .json({ success: false, error: "Usuário não encontrado." });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
