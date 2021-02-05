import mysql from 'mysql2/promise';
import config from '../config';

const pool = mysql.createPool(config.db);

async function query(sql:any, params:any) {
	const [rows, fields] = await pool.execute(sql, params);
	return rows;
}

export default {
	query
}
