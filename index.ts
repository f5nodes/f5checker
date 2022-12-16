import express from 'express';
import cors from 'cors'
import routes from './src/routes'

const app = express()

const PORT = process.env.PORT || 5050;
app.use(cors());

app.get('/', (req, res) => {
	res.send('F5Checker!');
});

async function start() {
	try {
		app.listen(PORT, () => console.log('F5Checker started on port ' + PORT));
	} catch (error: any) {
		console.log('Server Error:', error.message);
		process.exit(1);
	}
}

start();

app.use('/api', routes);
