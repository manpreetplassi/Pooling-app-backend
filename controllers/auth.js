import { createNewUser, getUserFromDb } from "../services/user.js"
import { genToken } from "../utils/auth.js";

export const loginAuth = async (req, res) => {
    const { email, password } = req.body;
    let token = null;
    const user = await getUserFromDb({ email, password })
    if (user) {
        token = await genToken({email})
    }
    return res.json({ token, user })

}

export const registerAuth = async (req, res) => {
    const { email, password } = req.body;
    const user = await createNewUser({ email, password });
    let token = null;
    if (user) {
        token = await genToken({email})
    }
    return res.json({ token, user })
}