import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes/routes';
import mysql from 'mysql2';

// REST API config
const app = express();
const port = 3000;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuring json response
app.set("json spaces", 2);

app.use("/", routes);

/*
// create the connection to database
const connection = mysql.createConnection({
	host: 'mysql.stud.ntnu.no',
	user: 'jonnynl_tdt4140',
	password: 'jonny123',
	database: 'jonnynl_tdt4140',
	connectTimeout: 10000
});

// simple query
connection.query(
	'SELECT * from test',
	function(err , results, fields) {
		console.log(results); // results contains rows returned by server
		// console.log(fields); // fields contains extra meta data about results, if available
		// console.log(err);
	}
);
*/
app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
});
