import express from "express";
import { router } from "./routes/Routes";
import cors from "cors";
class Server {
    public server: express.Application;
    private ALLOW_M2: string;
    private ALLOW_ALPOSTEL: string;
    constructor(){
        this.ALLOW_M2 = process.env.URL_M2 || "http://localhost:8888";
        this.ALLOW_ALPOSTEL = process.env.URL_ALPOSTEL || "http://localhost:3000"
        this.server = express();
        this.jsonParse();
        this.setupCors();
        this.routes();
    }

    private jsonParse = () :void => {
        this.server.use(express.json());
    };

    private setupCors(): void {
        this.server.use(cors({
            origin: [this.ALLOW_M2, this.ALLOW_ALPOSTEL],
            methods: ["GET", "PUT", "POST", "DELETE"]
        }));
    }

    private routes = () :void =>{
        this.server.use(router);
    }

}



export { Server };