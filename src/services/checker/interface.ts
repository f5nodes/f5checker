import { NodeNames } from './enums';
import { NodeInfoPayload } from '../../routes/info/interfaces';

export interface Checker {
  getLogs(): Promise<any>;
  getInfo(params: NodeInfoPayload): Promise<any>;
}

export type CheckerMap = Record<NodeNames, Checker>
