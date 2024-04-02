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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_1 = __importDefault(require("./services/socket"));
const PORT = process.env.PORT || 8000;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const httpServer = (0, http_1.createServer)();
        const socketServer = new socket_1.default();
        socketServer.io.attach(httpServer);
        httpServer.listen(PORT, () => {
            console.log(`the http server is listening at PORT: ${PORT}`);
        });
        socketServer.initListeners();
    });
}
init();
