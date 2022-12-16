import os from 'os';
import checkDiskSpace from 'check-disk-space';
import axios from 'axios';
import { formatBytes } from './utils';
import { ServerInfo } from './interfaces';

export async function getServerInfo(): Promise<ServerInfo> {
  let data: ServerInfo = {
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
  
  return data;
}
