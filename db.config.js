import postgres from 'postgres'

const sql = postgres({
    host: 'localhost',
    username: 'postgres',
    database: 'postgres',
    password: 'test',
    port: 5432
}) // will use psql environment variables

await sql`
 CREATE TABLE IF NOT EXISTS users (
 email TEXT PRIMARY KEY,
 password TEXT NOT NULL,
 task TEXT[]
)`.catch(err => console.error("table creation error: ", err))

await sql`
    CREATE TABLE IF NOT EXISTS pool (
    id SERIAL PRIMARY KEY,
    pool_title TEXT CHECK(length(pool_name) <= 30),
    pool_name TEXT CHECK(length(pool_name) <= 20),
    votes INTEGER DEFAULT 0
)`.catch(err => console.error("table creation error: ", err))

export default sql;
