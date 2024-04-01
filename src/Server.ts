import express from "express";
import { router } from "./routes/Routes";

class Server {
    public server: express.Application;

    constructor(){
        this.server = express();
        this.jsonParse();
        this.routes();
    }

    private jsonParse = () :void => {
        this.server.use(express.json());
    };

    private routes = () :void =>{
        this.server.use(router);
    }

}



export { Server };