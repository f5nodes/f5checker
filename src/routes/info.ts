import { Request, Response, Router } from 'express';
import { getServerInfo } from '../service/info';
import { check } from '../service/checker';
import { NodeNames } from '../service/checker/enums';

const router = Router();

router.get('/info/server', async (req: Request, res: Response) => {
	res.send(await getServerInfo());
});

router.get('/info/check-node', async (req: Request<unknown, unknown, unknown, {nodeName?: NodeNames, address?: string}>, res: Response) => {
	const {nodeName, address} = req.query
	if (!nodeName) {
		return res.status(400).send({
			message: 'nodeName should be defined'
		})
	}
	
	if (!address) {
		return res.status(400).send({
			message: 'address should be defined'
		})
	}
	
	if (!(nodeName in NodeNames)) {
		return res.status(400).send({
			message: `Can not find node for ${nodeName}`
		})
	}
	res.send(await check(nodeName, {address}));
});

export default router;
