import mongoose, { Document, Model } from "mongoose";
async function authenticate() {
    const DB_URL: string = process.env.DATABASE_URL || "need URL";
    try {
        // Conectar ao banco de dados usando a URL de conexão fornecida
        await mongoose.connect(DB_URL);
        console.log('Conexão bem-sucedida com o banco de dados MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    }
}


export { authenticate, mongoose, Document, Model };
