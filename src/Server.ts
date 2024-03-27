// const express = require("express");
import express, { Express } from "express";
import { router } from "./Routes/Routes";

class Server {
    public server: Express;

    constructor(){
        this.server = express();
        this.middleware();
        this.routes();
    }

    private middleware = () =>{
        // Adiciona o middleware express.json() para fazer o parse do corpo da requisição
        this.server.use(express.json());
    };

    private routes = ()=>{
        this.server.use(router);
    }

}



export { Server };