import { Router } from "express";
import { login } from "../controllers/autenticacao.controller";

export const autenticacaoRoute = () => {
  const router = Router();
  router.post("/", login);

  return router;
};