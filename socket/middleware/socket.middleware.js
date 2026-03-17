import { verifyTokenNoReturn } from "../../utils/auth.js";

export const authSocket = async (socket, next) => {

    const token = socket.handshake.auth?.token;
    if (!token) {
        return next(new Error("Token missing"));
    }
    
    try {
        
        const user = await verifyTokenNoReturn(token);

        if (user?.err) {
            return next(new Error(user.err));
        }

        socket.user = user.data.email;
        next();

    } catch (err) {
        next(new Error("Authentication error"));
    }

}