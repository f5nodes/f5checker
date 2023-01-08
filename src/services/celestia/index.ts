import { Checker } from '../checker/interface';
import { get } from '../../api';
import { verifyResponse } from '../../utils/verifyResponse';

interface CelestiaInfoResponse {
  result: {
    node_info: {
      sync_info: {
        latest_block_height: string,
        earliest_block_height: string,
        catching_up: boolean
      },
    }
  };
}

class CelestiaChecker implements Checker {
  async getLogs(): Promise<any> {

  }

  async getInfo(): Promise<any> {
    const celestaiStatus = await get<CelestiaInfoResponse>('http://localhost:26657/status');
    verifyResponse(celestaiStatus);
    const {data: {result}} = celestaiStatus
    console.log(result);
    // const {data: {result: {node_info: {sync_info:syncInfo}}}} = celestaiStatus
    // return {
    //   latestBlockHeight: syncInfo.latest_block_height,
    //   earliestBlockHeight: syncInfo.earliest_block_height,
    //   catchingUp: syncInfo.catching_up,
    // }
  }
}

export default new CelestiaChecker();
