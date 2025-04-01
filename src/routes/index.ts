import express from "express";
import "dotenv/config";
import { usuariosRoute } from "./usuarios.routes";
import { autenticacaoRoute } from "./autenticacao.routes";

export const routes = express.Router();
routes.get("/", (req, res) => {
    res.status(200).send({
        nome: process.env.NAME,
        ambiente: process.env.ENVIROMENT,
        versao: process.env.VERSION,
        status: process.env.STATUS
    })
});
routes.use('/usuarios', usuariosRoute());
routes.use('/autenticacao', autenticacaoRoute());

