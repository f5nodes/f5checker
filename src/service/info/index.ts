import os from 'os';
import { ServerInfo, Space } from './interfaces';
import { check as checkDiskUsage } from 'diskusage';
import { convertToMb } from './utils';

const getLoadAvg = (): number[] => {
  const coresCount = os.cpus().length
  return os.loadavg().map(item => Number(((item / coresCount) * 100).toFixed(2)))
}

const getRam = (): Space => {
  const totalRAM = os.totalmem();
  const freeRAM = os.freemem();
  
  return {
    total: convertToMb(totalRAM),
    used: convertToMb(totalRAM-freeRAM)
  }
}

const getDisk = async (): Promise<Space> => {
  const disk = await checkDiskUsage('/')
  return {
    total: convertToMb(disk.total),
    used: convertToMb(disk.total - disk.free)
  }
}

export async function getServerInfo(): Promise<ServerInfo> {
  return {
    hostname: os.hostname(),
    uptime: new Date(os.uptime() * 1000).toISOString().slice(11, 19),
    loadavg: getLoadAvg(),
    ram: getRam(),
    cpu: os.cpus().length,
    disk: await getDisk()
  };
}
