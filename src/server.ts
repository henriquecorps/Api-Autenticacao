import "dotenv/config";
import app from "./app";
import sequelizePromise from "./database/connection";

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    const sequelize = await sequelizePromise;

    app.listen(PORT, () => {
      console.log(`API online na porta: ${PORT}`);
    });

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida.");
  } catch (error) {
    console.error("Erro ao iniciar a API:", error);
  }
})();
