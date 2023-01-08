import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import routes from './src/routes'
import { normalizeError } from './src/errors/normalizeError';
import httpStatus from 'http-status';
import celestiaChecker from './src/services/celestia'
const app = express()

const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

// always should be last
app.use((err: any, req: any, res: any, next: any) => {
	const error = normalizeError(err)
	res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send({
		message: error.message,
	})
})
