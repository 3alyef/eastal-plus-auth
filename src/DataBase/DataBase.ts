import mongoose, { Document, Model } from "mongoose";
async function authenticate() {
    const DB_HOST: string = process.env.DB_HOST || "need host";

    try {
        // Conectar ao banco de dados usando a URL de conexão fornecida
        await mongoose.connect(`${DB_HOST}`);
        console.log('Conexão bem-sucedida com o banco de dados MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    }
}


export { authenticate, mongoose, Document, Model };
