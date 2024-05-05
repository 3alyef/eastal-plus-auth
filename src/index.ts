import { Server } from "./Server";
import dotenv from "dotenv";
import { authenticate } from "./db/DB";
dotenv.config();
const app = new Server();
const PORT = process.env.PORT || 3000;
//const URL = process.env.URL || 'nothing';


authenticate(); // Faz a autênticação com a database

app.server.listen(PORT, ()=>{
    
    console.log(`Server running on PORT: ${PORT}`);
})