import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from 'jsonwebtoken';
import { IUsuarioResponse } from "../interfaces/UserInterface";

export const login = async (req: Request, res: Response) => {
    try {
        const { login, senha, role } = req.body;

        const usuario = await User.findOne({ where: { login, role } });
        
        if (!usuario) {
            res.status(404).json({ mensagem: 'Usuário não encontrado' });
            return;
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        if (!senhaValida) {
            res.status(401).json({ mensagem: 'Credenciais inválidas' });
            return;
        }

        const token = jwt.sign(
            { id: usuario.id, role: usuario.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '8h' }
        );

        const response: IUsuarioResponse = {
            id: usuario.id,
            login: usuario.login,
            nome: usuario.nome,
            role: usuario.role,
            status: usuario.status,
            idVendedor: usuario.idVendedor || undefined
        };

        res.status(200).json({
            ...response,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao realizar login' });
    }
}