import { Register } from "./Registrer";
import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";

jest.mock("../../DataBase/Models/Models", () => ({
    userModel: {
        exists: jest.fn(),
        // Mockando o método save para retornar um usuário criado
        save: jest.fn().mockResolvedValue({
            user_name: "Test User",
            email: "test@example.com",
            password: "password"
        }),
    },
}));

describe("Register", () => {
    let register: Register;
    let req: Partial<Request>;
    let res: Partial<Response>;
    
    beforeEach(() => {
        register = new Register();
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn() ,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should handle registration successfully", async () => {
        // Configurando o mock para retornar true (usuário já existe)
        (userModel.exists as jest.Mock).mockResolvedValue(false);
        ((new userModel).save as jest.Mock).mockResolvedValue(
            {
                user_name: "Test User",
                email: "test@gmail.com",
                password: "password",
            }
        )
        // Chame initialize com o email que já existe
        req.body = {
            user_name: "Test User",
            email: "test@gmail.com",
            password: "password",
            repeatPassword: "password"
        };
        await register.initialize(req as Request, res as Response);

        // Verifique se o status 400 foi enviado (usuário já existe)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Registro bem-sucedido." });
    });




    
});
