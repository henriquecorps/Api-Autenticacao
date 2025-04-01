import { Response } from "express";

export const tratarErro = async (res: Response, error: any) => {
  // Tratamento para a Validação de dados pelo Sequelize
  if ((error.name || "").startsWith("Sequelize")) {
    if ((error.name || "") == "SequelizeValidationError") {
      const paths: string[] = error.errors.map((erro: any) => erro.path);

      const campos: string = paths.join(", ");

      if (paths.length == 1) {
        res.status(400).json({
          sucesso: false,
          mensagem: `Atenção! Campo obrigatório não preenchido: ${campos}`,
        });
        return;
        // Tratamento para a Validação de unique key pelo Sequelize
      } else {
        res.status(400).json({
          sucesso: false,
          mensagem: `Atenção! Campos obrigatórios não preenchidos: ${campos}`,
        });
        return;
      }
    } else if ((error.name || "") == "SequelizeUniqueConstraintError") {
      const paths: string[] = error.errors.map((erro: any) => erro.path);

      const campos: string = paths.join(", ");

      if (paths.length == 1) {
        res.status(400).json({
          sucesso: false,
          mensagem: `Atenção! O valor atribuído ao campo ${campos} já existe na base, por favor, escolha outro.`,
        });
        return;
      } else {
        res.status(400).json({
          sucesso: false,
          mensagem: `Atenção! O valor atribuído aos campos ${campos} já existem na base, por favor, escolha outro.`,
        });
        return;
      }
    }
  }

  if ((error.name || "").startsWith("InternalAPI")) {
    res.status(500).json({
      sucesso: false,
      mensagem: error.message,
    });
  } else {
    //Tratamento genérico
    res.status(500).json({
      sucesso: false,
      mensagem: "Ops! Temos um erro por aqui.",
      erro: error.message,
    });
  }
};

export class InternalAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalAPIError";
    Object.setPrototypeOf(this, InternalAPIError.prototype);
  }
}