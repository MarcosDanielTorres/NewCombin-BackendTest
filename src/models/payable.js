import mongoose from 'mongoose';

const payableSchema = mongoose.Schema({
    barcode: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    service: {
        type: String,
        enum: ["Electricity", "Gas", "Water"],
        required: true

    },
    description:{
        type: String,
        required: true,
    },
    expiration_date: {
        type: Date,
        required: true,

    },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    }

})

const Payable = mongoose.model('Payable', payableSchema);

export default Payable;