import {Router} from 'express';

import payableController from '../controllers/payableController';

const router = new Router();

router.route('/').get(payableController.getUnpaidPayables);
router.route('/').post(payableController.createPayable);

export default router;