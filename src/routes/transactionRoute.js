import {Router} from 'express';

import transactionController from '../controllers/transactionController';

const router = new Router();

router.route('/').get(transactionController.getTransactions);
router.route('/').post(transactionController.createTransaction);

export default router;