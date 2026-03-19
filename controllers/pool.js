import { addPoolIntoDB, getAllPoolFromDB } from "../services/pool.js";
import { getDataFormToken } from "../utils/auth.js";

export const createPool = async (req, res) => {
    const { pool_title, pool_options } = req.body;
    const dto = { pool_title, pool_options }
    console.log(req.body)
    const token = req.headers.authorization?.split(" ")[1];
    await getDataFormToken(token);

    const result = await addPoolIntoDB(dto);

    return res.json(result)

}

export const getAllPools = async (req, res) => {
    // const token = req.headers.authorization?.split(" ")[1];
    // const user = await getDataFormToken(token);
    const result = await getAllPoolFromDB();
    return res.json(result)
}

