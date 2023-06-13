const Usuario = require("../models/usuario");

const createUsuario = async(req, res) => {
    try {
        const { nome, email, avatarUrl } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            const novoUsuario = await Usuario.create({ nome, email, avatarUrl });

            return res.status(201).json(novoUsuario);
        } else {
            return res.status(400).json({ message: "O email informado já existe!" });
        }
    } catch (error) {
        console.error("Não foi possível criar novo usuário");
        return res
            .status(500)
            .json({ message: "Não foi possível criar novo usuário" });
    }
};

const readUsuario = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        return res.status(200).json(usuarios);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Não foi possível listar usuários" });
    }
};

const updateUsuario = async(req, res) => {
    try {
        const { idUsuario } = req.params;
        const { nome, email, avatarUrl } = req.body;

        const usuario = await Usuario.findByPk(idUsuario);

        if (usuario) {
            usuario.set({ nome, email, avatarUrl });

            const propsModificadas = usuario.changed();

            if (propsModificadas) {
                await usuario.save({ fields: propsModificadas });

                return res.status(200).json(usuario);
            } else {
                return res.status(400).json({ message: "Nenhum dado foi modificado" });
            }
        } else {
            return res.status(400).json({ message: "O email informado já existe!" });
        }
    } catch (error) {
        console.error("Não foi possível criar novo usuário");
        return res
            .status(500)
            .json({ message: "Não foi possível criar novo usuário" });
    }
};

const deleteUsuario = async(req, res) => {
    try {
        const { idUsuario } = req.params;

        const usuario = await Usuario.findByPk(idUsuario);

        if (usuario) {
            await usuario.destroy();

            return res.status(200).json({ message: "Usuário deletado com sucesso" });
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Não foi possível deletar usuário");
        return res
            .status(500)
            .json({ message: "Não foi possível deletar usuário" });
    }
};

module.exports = { createUsuario, readUsuario, updateUsuario, deleteUsuario };