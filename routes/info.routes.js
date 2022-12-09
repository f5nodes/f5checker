const { Router, json } = require('express');
const router = Router();

const os = require('os');
const axios = require('axios');
const checkDiskSpace = require('check-disk-space').default;

function formatSeconds(seconds) {
	seconds = Number(seconds);
	let d = Math.floor(seconds / (3600 * 24));
	let h = Math.floor((seconds % (3600 * 24)) / 3600);
	let m = Math.floor((seconds % 3600) / 60);
	// let s = Math.floor(seconds % 60);

	let dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
	let hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
	let mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
	// let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay;
}

function formatBytes(bytes, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// router.get('/', async (req, res) => {
// 	let data = {
// 		host: os.hostname() + ' – ' + os.platform(),
// 		uptime: formatSeconds(os.uptime),
// 		cpu: os.cpus().length,
// 		loadavg: os.loadavg(),
// 		memory:
// 			formatBytes(os.totalmem() - os.freemem()) +
// 			' / ' +
// 			formatBytes(os.totalmem()),
// 	};

// 	await checkDiskSpace('/').then((disk) => {
// 		disk.free = formatBytes(disk.free);
// 		disk.size = formatBytes(disk.size);
// 		data.disk = disk;
// 	});

// 	res.status(200).send(data);
// });

router.get('/simple', async (req, res) => {
	let data = {
		host: os.hostname(),
		cpu: os.cpus().length,
		ram: formatBytes(os.totalmem()),
	};

	await checkDiskSpace('/').then((disk) => {
		data.disk = formatBytes(disk.size);
	});

	await axios.get('https://freeipapi.com/api/json').then((response) => {
		data.location = response.data.countryName;
	});

	res.status(200).send(data);
});

module.exports = router;
