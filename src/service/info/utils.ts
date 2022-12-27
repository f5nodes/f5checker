export const formatBytes = (bytes: number, decimals = 2, isBinary = false): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (!+bytes) {
    return `0 ${sizes[0]}`;
  }

  const inByte = isBinary ? 1024 : 1000;
  const dm = decimals < 0 ? 0 : decimals;

  const pow = Math.floor(Math.log(bytes) / Math.log(inByte));
  const maxPow = Math.min(pow, sizes.length - 1);

  return `${parseFloat((bytes / Math.pow(inByte, maxPow)).toFixed(dm))} ${
    sizes[maxPow]
  }`;
}
