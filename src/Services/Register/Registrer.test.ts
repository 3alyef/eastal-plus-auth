import { Register } from "./Registrer";
import { Request, Response } from "express";
import { userModel } from "../../DataBase/Models/Models";

jest.mock("../../DataBase/Models/Models");
describe("Register", () => {
    it("should register a user", async () => {
        const mockFind = jest.spyOn(userModel, 'find');
        // Simula um objeto Request com os campos necessários

        const request = {
            body: {
                user_name: "test_user",
                email: "test@example.com",
                password: "password123",
                repeatPassword: "password123"
            }
        } as Request;

        const response = {
            status: jest.fn().mockReturnThis(), // Mock para o método status que retorna o próprio objeto

            json: jest.fn() // Mock para o método json
        } as unknown as Response;

        await new Register().initialize(request, response); // Espera até que a função start seja concluída

        mockFind.mockResolvedValue([]);




        // Verifica se o status 200 foi chamado
        //expect(response.status).toHaveBeenCalledWith(200);

        // Verifica se a mensagem de registro bem-sucedido foi enviada no formato JSON
        //expect(response.json).toHaveBeenCalledWith({ message: "Registro bem-sucedido.", requestBody: request.body });
    });
});
