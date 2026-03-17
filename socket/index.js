import { poolEvents } from "./events/pool.js";
import userEvents from "./events/user.js"
import { authSocket } from "./middleware/socket.middleware.js";

let users = new Map();
export function socketInit(io) {

    // middleware
    io.use((socket, next) => authSocket(socket, next));
    
    // initial events
    io.on('connection', (socket) => {
        console.log("test")
        console.log("connected:", socket.id);
        users[socket.user] = socket.id;

        // userEvents(io, socket, users);
        poolEvents(io, socket, users);

        socket.on("disconnect", () => {
            console.log("disconnected:", socket.id);
        });

        socket.on("error", (err) => {
            console.log("error:", err);
        });
    })
}