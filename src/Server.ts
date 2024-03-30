import express from "express";
import { router } from "./Routes/Routes";

class Server {
    public server: express.Application;

    constructor(){
        this.server = express();
        this.jsonParse();
        this.routes();
    }

    private jsonParse = () :void => {
        // Adiciona o middleware express.json() para fazer o parse do corpo da requisição
        this.server.use(express.json());
    };

    private routes = () :void =>{
        this.server.use(router);
    }

}



export { Server };