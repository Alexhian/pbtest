import dotenv from "dotenv";
import mysql from "mysql2/promise";
import fs from "node:fs";

dotenv.config();

const migrate = async () => {
	const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

	const connection = await mysql.createConnection({
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		multipleStatements: true,
	});

	await connection.query(`drop database if exists ${DB_NAME}`);
	await connection.query(`create database ${DB_NAME}`);
	await connection.query(`use ${DB_NAME}`);

	const sql = fs.readFileSync("./database/schema.sql", "utf8");

	await connection.query(sql);

	connection.end();
};

export default migrate;

try {
	migrate();
} catch (err) {
	console.error(err);
}
