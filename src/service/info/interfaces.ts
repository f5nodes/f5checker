export interface ServerInfo {
  hostname: string,
  cpu: number,
  uptime: string,
  ram: Space
  loadavg: number[],
  disk: Space
}

export interface Space {
  used: string,
  total: string
}
