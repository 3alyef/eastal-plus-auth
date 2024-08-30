import { Server } from "./Server";
import { authenticate } from "./db/DB";
const app = new Server();
const PORT = process.env.PORT || 3000;
//const URL = process.env.URL || 'nothing';

authenticate(); // Faz a autênticação com a database

app.server.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`);
})