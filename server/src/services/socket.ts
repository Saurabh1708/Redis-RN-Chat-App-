import { Redis } from "ioredis";
import { Server } from "socket.io";

const pub = new Redis();
const sub = new Redis();

class SocketService {
	private _io: Server;

	constructor() {
		this._io = new Server({
			cors: {
				allowedHeaders: ["*"],
				origin: ["*"],
			},
		});
		console.log("Socket service init");
		sub.subscribe("MESSAGES");
	}

	get io() {
		return this._io;
	}

	public initListeners() {
		console.log("init socket listeners");

		this.io.on("connect", (socket) => {
			console.log(`New socket connected`, socket.id);

			socket.on("event: message", async ({ message }: { message: string }) => {
				console.log("message is ", message);
				pub.publish("MESSAGES", JSON.stringify(message));
			});

			socket.on("disconnect", () => {
				console.log("user disconnected");
			});

			socket.on("connect_error", (reason) => {
				console.log("connection error", reason);
			});

			sub.on("message", (channel, message) => {
				if (channel === "MESSAGES") {
					console.log("message emitted", message);
					this.io.emit("message", message);
				}
			});
		});

		this.io.engine.on("connection_error", (err) => {
			console.log(err.req); // the request object
			console.log(err.code); // the error code, for example 1
			console.log(err.message); // the error message, for example "Session ID unknown"
			console.log(err.context); // some additional error context
		});
	}
}

export default SocketService;
