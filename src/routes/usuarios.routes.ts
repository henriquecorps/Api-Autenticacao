import { Router } from "express";
import { alterarStatusUsuario, atualizarUsuario, buscaUsuarios, insereUsuario } from "../controllers/usuario.controller";
import { verificaToken } from "../middlewares/verificaToken";

export const usuariosRoute = () => {
  const router = Router();
  router.get("/",verificaToken, buscaUsuarios);
  router.post("/",verificaToken, insereUsuario);
  router.put("/:id/:status",verificaToken, alterarStatusUsuario);
  router.put("/:id",verificaToken, atualizarUsuario);
  
  return router;
};