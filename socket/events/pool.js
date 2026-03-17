import { updateVoteinDb } from "../../services/pool.js";

export const poolEvents = (io, socket, users) => {

    // Opperations        
    socket.on("updateVote", async (data) => {
        console.log("updateVote:", data);
        // logic to update db
        const dto = {task: data.task, email: socket.user}
        const res = await updateVoteinDb(dto)
        await io.emit("latestVotes", res);
    });

};