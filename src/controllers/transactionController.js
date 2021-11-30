import Payable from '../models/payable';
import Transaction from '../models/transaction';


const getTransactions = async (req, res) => {
    try{
        let initial_date = req.query.initial_date;
        let final_date = req.query.end_date;

        if(initial_date && final_date){
            initial_date = new Date(initial_date);
            final_date = new Date(final_date);
            if (initial_date > final_date){
                throw new Error("The initial date must not be greater than the final date")
            }

            const result = await Transaction.aggregate([
                {
                    $match: {
                        payment_date : {
                            $gte: initial_date, $lt: final_date
                        }
                    }
                },
                {
                    $group : {
                        _id : {
                            $dateToString : {
                                format: "%Y-%m-%d", date: "$payment_date"}
                            },
                        total : {
                            $sum : "$amount_paid"
                        },
                        number_of_transactions : {
                            $sum: 1
                        }
                    }
                },
                {
                    $addFields: {payment_date: { $toString: "$_id"}}
                },
                { 
                    $project: {_id: 0}
                }
            ]);

            res.status(200).send(result)
        }else{
            throw new Error("There must be a valid initial and final date");
        }
    }catch(err){
        res.send({err: err.message})
    }
    
    
}

const createTransaction = async (req, res) => {
    try{
        const barcode = req.body.barcode.toLowerCase();
        const payable = await Payable.findOne({"barcode": barcode});
        if (!payable){
            throw new Error('Can not find a bill that contains the barcode provided');
        }

        if(payable.status === 'paid'){
            throw new Error("The bill has already been paid.");
        }

        if(req.body.payment_method === "cash" && req.body.card_number != null){
            throw new Error("Can not associate a credit/debit card with a cash payment.");
        }

        if(req.body.payment_method != "cash" && !req.body.card_number){
            throw new Error("The credit/debit card number must be specified.");
        }
        

        if(req.body.amount_paid != payable.amount){
            throw new Error(`The amount entered is incorrect. Amount due: $${payable.amount} - Amount entered: $${req.body.amount_paid}`);
        }


        const transaction = new Transaction({...req.body, barcode});
        await transaction.save();

        payable.status = "paid";
        await payable.save();

        res.status(201).send({
           transaction
        })
    }catch(err){
        res.status(400).send({
            error: err.message});
    }
}

export default {getTransactions, createTransaction};