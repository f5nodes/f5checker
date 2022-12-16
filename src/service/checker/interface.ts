import { NodeNames } from './enums';

export interface Checker {
  getLogs(): Promise<any>;
  getStatus(): Promise<any>;
}

export type CheckerMap = Record<NodeNames, Checker>
