import { CheckerMap } from './interface';
import { NodeNames } from './enums';
import celestiaChecker from '../celestia';
import starknetChecker from '../starknet';
import massaChecker from '../massa';
import { MassaInfoParams } from '../massa/interfaces';

const checkerMaps: CheckerMap = {
  [NodeNames.celestia]: celestiaChecker,
  [NodeNames.starknet]: starknetChecker,
  [NodeNames.massa]: massaChecker,
}

export async function check(nodeName: NodeNames, infoParams?: MassaInfoParams): Promise<any> {
  const checker = checkerMaps[nodeName];
  
  return {
    info: await checker.getInfo(infoParams),
    logs: await checker.getLogs(),
  }
}
