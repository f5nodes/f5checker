import { CheckerMap } from './interface';
import { NodeNames } from './enums';
import celestiaChecker from '../celestia';
import starknetChecker from '../starknet';
import massaChecker from '../massa';

const checkerMaps: CheckerMap = {
  [NodeNames.celestia]: celestiaChecker,
  [NodeNames.starknet]: starknetChecker,
  [NodeNames.massa]: massaChecker,
}

export async function check(nodeName: NodeNames): Promise<any> {
  const checker = checkerMaps[nodeName];
  
  return {
    status: await checker.getStatus(),
    logs: await checker.getLogs(),
  }
}
