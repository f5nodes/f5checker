import { Request, Response, Router } from 'express';
import os from 'os'
import axios from 'axios'
import checkDiskSpace from 'check-disk-space';

const router = Router();

function formatBytes(bytes: number, decimals = 2): string {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

router.get('/simple', async (req: Request, res: Response) => {
	let data = {
		host: os.hostname(),
		cpu: os.cpus().length,
		ram: formatBytes(os.totalmem()),
		disk: '',
		location: '',
	};

	const disk = await checkDiskSpace('/')
	data.disk = formatBytes(disk.size);

	const {data: {countryName}} = await axios.get('https://freeipapi.com/api/json');
	data.location = countryName;

	res.status(200).send(data);
});

export default router;
