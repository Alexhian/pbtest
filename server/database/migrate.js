import dotenv from "dotenv";
import { Client } from "pg";
import fs from "node:fs";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const migrate = async () => {
    const adminClient = new Client({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: "postgres",
	});
    await adminClient.connect();

    await adminClient.query(`DROP DATABASE IF EXISTS "${DB_NAME}"`);
    await adminClient.query(`CREATE DATABASE "${DB_NAME}"`);
    await adminClient.end();

    const dbClient = new Client({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });
    await dbClient.connect();

    const sql = fs.readFileSync("./database/schema.sql", "utf8");
    await dbClient.query(sql);

    await dbClient.end();
};

try {
    await migrate();
    console.log("Migration terminée !");
} catch (err) {
    console.error(err);
}