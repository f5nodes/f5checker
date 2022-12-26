import { Router } from 'express';
import infoRoutes from './info'
const router = Router();

router.use(infoRoutes)

export default router;
