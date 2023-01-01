import os from 'os';
import axios from 'axios';
import { SimpleInfo, ServerInfo, Space } from './interfaces';
import checkDiskSpace from 'check-disk-space';
import { formatBytes } from './utils';

const getLocation = async (): Promise<string> => {
	const {
		data: { countryName },
	} = await axios.get('https://freeipapi.com/api/json');
	return countryName;
};

const getLoadAvg = (): number[] => {
	const coresCount = os.cpus().length;
	return os.loadavg().map((item) => Number(((item / coresCount) * 100).toFixed(2)));
};

const getRam = (decimals = 2): Space => {
	const totalRAM = os.totalmem();
	const freeRAM = os.freemem();

	return {
		total: formatBytes(totalRAM, decimals),
		used: formatBytes(totalRAM - freeRAM, decimals),
		free: formatBytes(freeRAM, decimals),
	};
};

const getRamTotal = async (): Promise<string> => {
	return (await getRam(0)).total;
};

const getDisk = async (decimals = 2): Promise<Space> => {
	const disk = await checkDiskSpace('/');
	return {
		total: formatBytes(disk.size, decimals),
		used: formatBytes(disk.size - disk.free, decimals),
		free: formatBytes(disk.free, decimals),
	};
};

const getDiskTotal = async (): Promise<string> => {
	return (await getDisk(0)).total;
};

const getUptime = (): string => {
	const date = new Date(os.uptime() * 1000);
	const days = date.getDay();
	const hoursAndSeconds = date.toISOString().slice(11, 16).split(':');
	return `${days}d ${hoursAndSeconds[0]}h ${hoursAndSeconds[1]}m`;
};

export async function getServerSimpleInfo(): Promise<SimpleInfo> {
	return {
		hostname: os.hostname(),
		cpu: os.cpus().length,
		ram: await getRamTotal(),
		disk: await getDiskTotal(),
		location: await getLocation(),
	};
}

export async function getServerInfo(): Promise<ServerInfo> {
	return {
		hostname: os.hostname(),
		uptime: getUptime(),
		loadavg: getLoadAvg(),
		ram: getRam(),
		cpu: os.cpus().length,
		disk: await getDisk(),
		location: await getLocation(),
	};
}
