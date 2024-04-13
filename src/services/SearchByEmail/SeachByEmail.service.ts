import { userModel } from "../../db/models/Models";



class SearchByEmail {
    public async initialize(email: string): Promise<string | null>{
        try {
            const userSoul: string | null = await this.findUser(email)
            return userSoul;
        } catch (error) {     
            console.error('Erro durante a inicialização da pesquisa por email:', error);
            throw error;
        }
    }

    private async findUser(email: string): Promise<string | null> {
        try {
            const user: { soulName: string } | null = await userModel.findOne({ email: email }, 'soulName');
    
            if (user) {
                // Retorna um objeto contendo o soulName do usuário
                return user.soulName;
            } else {
                // Retorna null se nenhum usuário for encontrado
                return null;
            }
        } catch (error) {
            console.error('Erro ao encontrar usuário:', error);
            throw new Error('Ocorreu um erro ao encontrar o usuário.');
        }
    }
}



export { SearchByEmail };