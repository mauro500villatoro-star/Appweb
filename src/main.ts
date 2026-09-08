import app from "./app";
import { PORT } from "./config/env";
import { sequelize } from "./database";

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Conectado correctamente a PostgreSQL");

    await sequelize.sync();

    console.log("Modelos sincronizados correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
