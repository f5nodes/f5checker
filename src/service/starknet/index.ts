import { Checker } from '../checker/interface';

class StarknetChecker implements Checker {
  async getLogs(): Promise<any> {
    
  }

  async getStatus(): Promise<any> {

  }
}

export default new StarknetChecker()
