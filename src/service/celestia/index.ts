import { Checker } from '../checker/interface';

class CelestiaChecker implements Checker {
  async getLogs(): Promise<any> {
    
  }

  async getInfo(): Promise<any> {
    
  }
}

export default new CelestiaChecker()
