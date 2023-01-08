import { Checker } from '../checker/interface';
import { get } from '../../api';

class CelestiaChecker implements Checker {
  async getLogs(): Promise<any> {
    
  }

  async getInfo(): Promise<any> {
    const celestaiStatus = await get('http://localhost:26657/status');
    console.log(celestaiStatus);
  }
}

export default new CelestiaChecker()
