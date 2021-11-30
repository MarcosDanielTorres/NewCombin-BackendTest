import {Router} from 'express';

import payableController from '../controllers/payableController';

const router = new Router();

router.route('/').get(payableController.getPayables);
router.route('/').post(payableController.createPayable);

export default router;