const express = require('express');
const app = express();

const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
	res.send('F5Checker!');
});

async function start() {
	try {
		app.listen(PORT, () => console.log('F5Checker started on port ' + PORT));
	} catch (error) {
		console.log('Server Error:', error.message);
		process.exit(1);
	}
}

start();

app.use('/info', require('./routes/info.routes'));