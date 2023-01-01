import { NextFunction, Request, Response } from 'express';
import { NodeInfoOptional } from '../routes/info/interfaces';
import { NodeNames } from '../services/checker/enums';
import { validationError } from '../errors';

export const validateNodeInfo = (req: Request<unknown, unknown, NodeInfoOptional, unknown>, res: Response, next: NextFunction) => {
  const {nodeName, payload} = req.body
  console.log(req.body);

  if (!nodeName) {
    throw validationError('nodeName should be defined')
  }

  if (!(nodeName in NodeNames)) {
    throw validationError(`Can not find node for ${nodeName}`)
  }
  
  if (!payload) {
    throw validationError(`Payload should be defined for node info`)
  }
  
  next();
}
