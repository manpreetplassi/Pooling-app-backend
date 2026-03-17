import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from '../db.config.js';

export const saltAndHashPassword = async (password) => {
    try {
        const saltRounds = 10; // Recommended value, adjust based on performance needs
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error(err);
        throw new Error((err))
    }
}

export const genToken = async (data) => {
    try {
        var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data
        }, process.env.JWT_SECRET || 'secret');
        return token;
    } catch (err) {
        throw new Error(err)
    }
}

export const getDataFormToken = async (token) => {
    // invalid token - synchronous
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const isExist = await sql`
        SELECT * FROM USERS where email=${decoded.data.email}`
        if (!isExist.length) throw new Error('user not exist')
        return decoded;
    } catch (err) {
        throw new Error(err)
    }
}


export const verifyTokenNoReturn = async (token) => {
    // invalid token - synchronous
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const isExist = await sql`
        SELECT * FROM USERS where email=${decoded.data.email}`
        if (!isExist.length) return { err: "user not exist" }
        return decoded;
    } catch (err) {
        return { err }
    }
}