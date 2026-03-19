import sql from "../db.config.js";

export const addPoolIntoDB = async (dto) => {
    const { pool_title, pool_options } = dto;
    // Create an array of objects matching your column names
    const rows = pool_options.map(name => ({
        pool_title: pool_title,
        pool_name: name
    }));
    try {
        const Pool = await sql`INSERT INTO pool ${sql(rows, 'pool_title', 'pool_name')} RETURNING *`;
        return Pool;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateVoteinDb = async (dto) => {
    const { task, email } = dto;
    addTask(task)
    let allTasks = await sql`SELECT task from users where email=${email}`
    const isVoted = await allTasks[0].task?.includes(task);
    let updatedVotes;
    if (isVoted) {
        allTasks = allTasks.filter(t => t !== task);
        updatedVotes = await sql`UPDATE vote SET count = count - 1 where task=${task} RETURNING*`
    } else {
        allTasks.push(task)
        updatedVotes = await sql`UPDATE vote SET count = count + 1 where task=${task} RETURNING*`
    }
    await sql`UPDATE users SET task=${allTasks} where email=${email}`
    return updatedVotes[0]
}

const addTask = async (task) => {
    await sql`INSERT INTO vote (task, count) values (${task}, 0) 
    ON CONFLICT (task) DO NOTHING`
}

export const getAllPoolFromDB = async () => {
    try {
        const data = await sql`
        SELECT * from pool`;
        console.log(data, 'shabdbh')

        if (data.length == 0) {
            console.log("pool is empty")
        }
        const formattedData = Object.values(data.reduce((acc, row) => {
            if (!acc[row.pool_title]) {
                acc[row.pool_title] = {
                    pool_title: row.pool_title,
                    pool_data: []
                };
            }
            acc[row.pool_title].pool_data.push({
                pool_name: row.pool_name,
                votes: row.votes,
            })
            return acc
        }, {}))
        return formattedData;
    } catch (error) {
        console.log(error, 'shabdbh')

    }
}


const arr = [
    {
        pool_title: 'this is pool one',
        pool_data: [
            {
                pool_name: 'pool11',
                votes: '45'
            },
            {
                pool_name: 'pool12',
                votes: '15'
            }
        ]
    },
    {
        poolHeading: 'this is pool one',
        totalVotes: 450,
        data: [
            {
                pool_name: 'pool11',
                votes: '45'
            },
            {
                pool_name: 'pool12',
                votes: '15'
            }
        ]
    }
]