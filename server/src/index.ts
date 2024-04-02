import { createServer } from "http";
import SocketService from "./services/socket";

const PORT = process.env.PORT || 8000;

async function init() {
	const httpServer = createServer();
	const socketServer = new SocketService();
	socketServer.io.attach(httpServer);

	httpServer.listen(PORT, () => {
		console.log(`the http server is listening at PORT: ${PORT}`);
	});

	socketServer.initListeners();
}

init();
