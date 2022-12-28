import { Checker } from '../checker/interface';
import axios from 'axios';
import { MassaInfoParams, MassaResponse } from './interfaces';
import httpStatus from 'http-status';

class MassaChecker implements Checker {
  async getLogs(): Promise<any> {
    
  }

  async getInfo(params: MassaInfoParams): Promise<any> {
    const {address} = params
    const {data: {result}, status} = await axios.post<MassaResponse>('https://test.massa.net/api/v2', {
      jsonrpc: "2.0",
      id: 1,
      method: "get_addresses",
      params: [[address]]
    })
    if (status !== httpStatus.OK) {
      return {
        message: `Can not get massa address for ${address}`
      }
    }
    
    const massaInfo = result[0]
    
    const response = {
      address: massaInfo.address,
      finalBalance: massaInfo.final_balance,
      finalRollCount: massaInfo.final_roll_count,
      activeRolls: 0,
    }
    
    massaInfo.cycle_infos.forEach(({active_rolls}) => {
      response.activeRolls += active_rolls
    })
    
    return response;
  }
}

export default new MassaChecker()
