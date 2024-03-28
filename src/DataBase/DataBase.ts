import mongoose, { Document, Model } from "mongoose";
async function authenticate() {
    const USER: string = process.env.DB_USER || "need user";
    const PASSWORD: string = process.env.DB_PASSWORD || "need host";
    const DB_NAME: string = process.env.DB_NAME || "need your database name";
    const DB_HOST: string = process.env.DB_HOST || "need host";

    try {
        // Conectar ao banco de dados usando a URL de conexão fornecida
        await mongoose.connect(`mongodb://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}`);
        console.log('Conexão bem-sucedida com o banco de dados MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    }
}


export { authenticate, mongoose, Document, Model };
