import sequelize from "../database/connection";
import User from "../models/User";
import { tratarErro } from "../utils/tratarErros";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUsuarioResponse, IUsuarioUpdate, UserInterface, UsuarioCreateInterface } from "../interfaces/UserInterface";

export const buscaUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await User.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    tratarErro(res, error);
  }
};



export const insereUsuario = async (req: Request, res: Response) => {
  try {
    const { login, senha, nome, role, status, idVendedor } = req.body;

    const usuarioExistente = await User.findOne({ where: { login } });
    if (usuarioExistente) {
        res.status(400).json({ mensagem: 'Login já está em uso' });
        return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
        login,
        senha: senhaHash,
        nome,
        role,
        status,
        idVendedor
    });

    const response: UsuarioCreateInterface = {
        id: novoUsuario.id,
        login: novoUsuario.login,
        nome: novoUsuario.nome,
        role: novoUsuario.role,
        status: novoUsuario.status,
        idVendedor: novoUsuario.idVendedor || undefined
    };

    res.status(201).json(response);
} catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao registrar usuário' });
}
};

export const atualizarUsuario = async (req: Request, res: Response) =>{
  try {
    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
      return;
    }
    let dados: IUsuarioUpdate = req.body;
    if (dados.senha) {
      const senhaHash = await bcrypt.hash(dados.senha, 10);
      dados={...dados,senha:senhaHash}
    }
    await usuario.update(dados);
    
    const response: IUsuarioResponse = {
      id: usuario.id,
      login: usuario.login,
      nome: usuario.nome,
      role: usuario.role,
      status: usuario.status,
      idVendedor: usuario.idVendedor || undefined,
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
  }
}
export const alterarStatusUsuario = async (req: Request, res: Response) =>{
  try {
    const usuario = await User.findByPk(req.params.id);
    const status = req.params.status;

    if (!usuario) {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
      return;
    }
    if (status!=="A"&&status!=="I") {
      res.status(400).json({ mensagem: "Status não permitido" });
      return;
    }

    await usuario.update({status});

    const response: IUsuarioResponse = {
      id: usuario.id,
      login: usuario.login,
      nome: usuario.nome,
      role: usuario.role,
      status: usuario.status,
      idVendedor: usuario.idVendedor || undefined,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
  }
}
