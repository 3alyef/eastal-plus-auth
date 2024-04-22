import express from "express";
import { router } from "./routes/Routes";

const cors = require("cors");
class Server {
    public server: express.Application;
    private ALLOW: string
    constructor(){
        this.ALLOW = process.env.URL_M2 || "http://localhost:8888";
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
            origin: [this.ALLOW, "http://localhost:3000", "https://al-postel.vercel.app"],
            methods: ["GET", "PUT", "POST", "DELETE"]
        }));
    }

    private routes = () :void =>{
        this.server.use(router);
    }

}



export { Server };