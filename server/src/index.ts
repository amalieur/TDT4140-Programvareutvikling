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

app.use("/api", routes);

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
});
