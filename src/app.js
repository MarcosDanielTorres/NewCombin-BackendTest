import './db/mongoose';
import express from 'express';

import payableRoute from './routes/payableRoute';
import transactionRoute from './routes/transactionRoute';

const app = express();


app.use(express.json())
app.use('/api/payables', payableRoute);
app.use('/api/transactions', transactionRoute)

export default app;