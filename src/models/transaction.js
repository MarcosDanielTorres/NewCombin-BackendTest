import mongoose, { Schema } from 'mongoose';

const transactionSchema = mongoose.Schema({
    payment_method: {
        type: String,
        required: true,
        enum: ["debit_card", "credit_card", "cash"]
    },
    card_number: {
        type: String,
        default: null,
    },
    payment_date: {
        type: Date,
        default: Date.now(),
    },
    amount_paid: {
        type: Number,
        required: true,
    },
    barcode: {
        type: String,
        required: true
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;