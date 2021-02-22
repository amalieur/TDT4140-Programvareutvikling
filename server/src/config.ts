const { config } = require('dotenv');
config({ path: __dirname+'/../.env'});
const env = process.env;

export default {
	db: {
		host: env.DB_HOST || 'mysql.stud.ntnu.no',
		user: env.DB_USER || 'jonnynl_tdt4140',
		password: env.DB_PASSWORD || 'jonny123',
		database: env.DB_NAME || 'jonnynl_tdt4140',
		waitForConnections: true,
		connectionLimit: 2,
		queueLimit: 0,
		debug: false
	},
	listPerPage: 10,
	JWT_KEY : env.JWT_KEY || "",
	HOST: env.HOST || "localhost",
    PORT: env.HTTPPORT || 3000,
    ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET,
};
