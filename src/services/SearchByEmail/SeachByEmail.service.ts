import { dataUserImageModel, userModel } from "../../db/models/Models";

export interface imageResp {
    userImage: string | null; 
    lastUpdateIn: string | null
}

class SearchByEmail {
    public async initialize(email: string): Promise<{userSoul: string, first_name: string, userImageData: imageResp} | null>{
        try {
            const userData: { userSoul: string, first_name: string } | null = await this.findUser(email);
            if(userData){ 
                const userImageData: imageResp = await this.findImage(userData.userSoul)
                return {userSoul: userData.userSoul, first_name: userData.first_name, userImageData};      
            }
            return null
        } catch (error) {     
            console.error('Erro durante a inicialização da pesquisa por email:', error);
            throw error;
        }
    }

    private async findUser(email: string): Promise<{ userSoul: string, first_name: string } | null> {
        try {
            const user: { soulName: string, first_name: string } | null = await userModel.findOne({ email }, 'soulName first_name');
    
            if (user) {
                // Retorna um objeto contendo o soulName do usuário
                return {userSoul: user.soulName, first_name: user.first_name}
            } else {
                // Retorna null se nenhum usuário for encontrado
                return null;
            }
        } catch (error) {
            console.error('Erro ao encontrar usuário:', error);
            throw new Error('Ocorreu um erro ao encontrar o usuário.');
        }
    }

    private async findImage(userSoul: string): Promise<imageResp>{
        try {
            const image = await dataUserImageModel.findOne({userSoul}, "userImage lastUpdateIn")
            if(!image){
                throw {message: "erro ao buscar imagem"}
            }
            return {
                userImage: image.userImage ? image.userImage : null, 
                lastUpdateIn: image.lastUpdateIn ? image.lastUpdateIn : null
            }
        }catch(erro) {
            const {message} = erro as {message: string};
            console.log(message)
            return {userImage: null, lastUpdateIn: null}
        }

    }
}



export { SearchByEmail };