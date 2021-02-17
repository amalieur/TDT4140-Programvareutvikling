import app from './app';

// REST API config
const port = 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
});