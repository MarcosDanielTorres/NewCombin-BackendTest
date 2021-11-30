import Payable from '../models/payable';

const getUnpaidPayables = async (req, res) => {
    try{
        if(req.query.service){
            const payables = await Payable.find({
                service: req.query.service,
                status: "pending"
            }); 

            const reformated_payable = payables.map((value) => {
                return {
                    "expiration_date": value.expiration_date,
                    "amount": value.amount,
                    "barcode": value.barcode
                }
            })

            res.status(200).send(
                reformated_payable
            )
        }else{
            const payables = await Payable.find({
                status: "pending"
            });

            const reformated_payable = payables.map((value) => {
                return {
                    "service": value.service,
                    "expiration_date": value.expiration_date,
                    "amount": value.amount,
                    "barcode": value.barcode
                }
            })
            res.status(200).send(
                reformated_payable 
            )
        }
    }catch(err){
        res.status(400).send({
            error: err.message
        })
    }
    
}

const createPayable = async (req, res) => {
    try{
        const payable = new Payable(req.body);
        await payable.save();
        res.status(201).send(
            payable
        )
    }catch(err){
        res.status(400).send({
            error: err});
    }
}

export default {getUnpaidPayables, createPayable};