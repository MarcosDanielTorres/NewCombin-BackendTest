import mongoose from 'mongoose';

const db ='mongodb://127.0.0.1:27017/New-Combin';

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})