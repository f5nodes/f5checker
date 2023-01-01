import { Checker } from '../checker/interface';

class StarknetChecker implements Checker {
  async getLogs(): Promise<any> {
    
  }

  async getInfo(): Promise<any> {

  }
}

export default new StarknetChecker()
