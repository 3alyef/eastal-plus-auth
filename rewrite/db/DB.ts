import mongoose from "mongoose";

async function authenticate() {
  const url_database: string = process.env.DB_URL || "";
  try {
    await mongoose.connect(`${url_database}`);
    console.log("Conexão bem-sucedida com o banco de dados MongoDB.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados MongoDB: ", error);
  }
}

export { authenticate };
