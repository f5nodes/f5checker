import { Checker } from '../checker/interface';

class MassaChecker implements Checker {
  async getLogs(): Promise<any> {
    
  }

  async getStatus(): Promise<any> {

  }
}

export default new MassaChecker()
