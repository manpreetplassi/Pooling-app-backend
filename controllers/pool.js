import { addVoteIntoDB } from "../services/pool.js";
import { getDataFormToken } from "../utils/auth.js";

export const addVote = async (req, res) => {
    const { task, email } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const user = await getDataFormToken(token);
    if(token.data.email !== email){
        return res.json('invalid email');
    }
    const result = await addVoteIntoDB(task, email);

    return res.json(result)

}
