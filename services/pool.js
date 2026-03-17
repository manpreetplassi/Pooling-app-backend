import sql from "../db.config.js";

export const addVoteIntoDB = async (task, email) => {
    try {
        const isVoted = await sql`
        SELECT task from users where email=${email}`;
        if(isVoted[0].task.includes(task)) throw new Error('only one vote allowed');
        const vote = await sql`
        UPDATE votes 
        SET count = count + 1 
        RETURNING *`
        const newTasks = isVoted[0].task.push(task);
        const updateUser = await sql`
        UPDATE USERS
        SET task = newTasks
        where email=${email}`
        return vote;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateVoteinDb = async(dto) => {
    const {task, email} = dto;
    addTask(task)
    let allTasks = await sql`SELECT task from users where email=${email}`
    const isVoted = await allTasks[0].task?.includes(task);
    let updatedVotes;
    if(isVoted){
        allTasks = allTasks.filter(t => t !== task);
        updatedVotes = await sql`UPDATE vote SET count = count - 1 where task=${task} RETURNING*`
    } else{
        allTasks.push(task)
        updatedVotes = await sql`UPDATE vote SET count = count + 1 where task=${task} RETURNING*`
    }
    await sql`UPDATE users SET task=${allTasks} where email=${email}`
    return updatedVotes[0]
}

const addTask = async(task) => {
    await sql`INSERT INTO vote (task, count) values (${task}, 0) 
    ON CONFLICT (task) DO NOTHING`
}