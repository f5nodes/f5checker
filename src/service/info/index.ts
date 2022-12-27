import os from 'os';
import { ServerInfo, Space } from './interfaces';
import checkDiskSpace from 'check-disk-space';
import { formatBytes } from './utils';

const getLoadAvg = (): number[] => {
  const coresCount = os.cpus().length
  return os.loadavg().map(item => Number(((item / coresCount) * 100).toFixed(2)))
}

const getRam = (): Space => {
  const totalRAM = os.totalmem();
  const freeRAM = os.freemem();
  
  return {
    total: formatBytes(totalRAM),
    used: formatBytes(totalRAM-freeRAM)
  }
}

const getDisk = async (): Promise<Space> => {
  const disk = await checkDiskSpace('/')
  return {
    total: formatBytes(disk.size),
    used: formatBytes(disk.size - disk.free)
  }
}

const getUptime = (): string => {
  const date = new Date(os.uptime() * 1000)
  const days = date.getDay()
  const hoursAndSeconds = date.toISOString().slice(11, 16).split(':')
  return `${days}d ${hoursAndSeconds[0]}h ${hoursAndSeconds[1]}m`
}

export async function getServerInfo(): Promise<ServerInfo> {
  return {
    hostname: os.hostname(),
    uptime: getUptime(),
    loadavg: getLoadAvg(),
    ram: getRam(),
    cpu: os.cpus().length,
    disk: await getDisk()
  };
}
