"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const socket_io_1 = require("socket.io");
const pub = new ioredis_1.Redis();
const sub = new ioredis_1.Redis();
class SocketService {
    constructor() {
        this._io = new socket_io_1.Server({
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
    initListeners() {
        console.log("init socket listeners");
        this.io.on("connect", (socket) => {
            console.log(`New socket connected`, socket.id);
            socket.on("event: message", (_a) => __awaiter(this, [_a], void 0, function* ({ message }) {
                console.log("message is ", message);
                pub.publish("MESSAGES", JSON.stringify(message));
            }));
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
exports.default = SocketService;
