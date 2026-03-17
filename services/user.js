import sql from "../db.config.js"
import { saltAndHashPassword } from "../utils/auth.js";
import bcrypt from 'bcrypt'

export const getUserFromDb = async (data) => {
    try {
        const user = await sql`
        SELECT * FROM USERS where email=${data.email}`
        if (!user.length) throw new Error("user not found");
        const verify = await bcrypt.compare(data.password, user[0].password, function (err, result) {
            return result;
        });
        if(verify == false)  throw new Error("invalid password");
        return user
    } catch (error) {
        throw new Error(error);
    }
}

export const createNewUser = async (data) => {
    try {
        const isExist = await sql`
        SELECT email FROM users where email=${data.email}`
        if (isExist.length) throw new Error("User already exist");
        const hashP = await saltAndHashPassword(data.password);
        const user = await sql`
        INSERT INTO users
        (email, password)
        values (${data.email}, ${hashP}) returning email`
        console.log(user);
        return user
    } catch (error) {
        throw new Error(error);
    }
}

