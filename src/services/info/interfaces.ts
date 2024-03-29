export interface SimpleInfo {
	hostname: string;
	cpu: number;
	ram: string;
	disk: string;
	location: string;
}

export interface ServerInfo {
	hostname: string;
	cpu: number;
	uptime: string;
	ram: Space;
	loadavg: number[];
	disk: Space;
	location: string;
}

export interface Space {
	total: string;
	used: string;
	usedPart: number;
	free: string;
}
