import { NodeNames } from '../../services/checker/enums';
import { MassaInfoParams } from '../../services/massa/interfaces';

export interface NodeInfoOptional {
  nodeName?: NodeNames,
  payload: NodeInfoPayload
}

export interface NodeInfo {
  nodeName: NodeNames,
  payload: NodeInfoPayload;
}

export type NodeInfoPayload = MassaInfoParams
