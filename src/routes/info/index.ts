import { NextFunction, Request, Response, Router } from 'express';
import { getServerInfo, getServerSimpleInfo } from '../../services/info';
import { check } from '../../services/checker';
import { NodeInfo } from './interfaces';
import { validateNodeInfo } from '../../middlewares/checkNode';

const router = Router();

router.get('/info/simple', async (req: Request, res: Response) => {
	res.send(await getServerSimpleInfo());
});

router.get('/info/server', async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.send(await getServerInfo());
	} catch (e) {
		next(e)
	}
});

router.post('/info/check-node', validateNodeInfo, async (req: Request<unknown, unknown, NodeInfo, unknown>, res: Response, next: NextFunction) => {
	try {
		const {nodeName, payload} = req.body

		res.send(await check(nodeName, payload));
	} catch (e) {
		next(e)
	}
});

export default router;
