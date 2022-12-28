import { NodeNames } from './enums';

export interface Checker {
  getLogs(): Promise<any>;
  getInfo(params?: any): Promise<any>;
}

export type CheckerMap = Record<NodeNames, Checker>
