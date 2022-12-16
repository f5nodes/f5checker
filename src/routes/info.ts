import { Request, Response, Router } from 'express';
import { getServerInfo } from '../service/info';
import { check } from '../service/checker';
import { NodeNames } from '../service/checker/enums';

const router = Router();

router.get('/info/server', async (req: Request, res: Response) => {
	res.send(await getServerInfo());
});

router.get('/info/check-node', async (req: Request, res: Response) => {
	// need to decide where we want to store nodeName.
	// mb in query while send get request (I prefer this variant)
	// mb in env
	const nodeName = NodeNames.celestia;
	res.send(await check(nodeName));
});

export default router;
