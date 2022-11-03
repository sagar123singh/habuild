const rankingModel=require('../model/rankingModel')

const create= async(req,res)=>{
    try{
        const body= req.body
        const topic= req.body.topic
        const requiredFields = ['topic','ranking'];

        for (let i = 0; i < requiredFields.length; i++) {
            if (body[requiredFields[i]] === undefined) {
                return res.status(400).send({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (body[requiredFields[i]] === "null" || body[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }

        if (!(/^([0-9]{1,2}){1}(\.[0-9]{1,2})?$/g).test(body.ranking)) {
            return res.status(400).send({status: false,message: 'plz give rank between 1 to 100'});
        }

            // Checking duplicate topic
            const duplicateTopic = await rankingModel.findOne({ topic:topic });
            if (duplicateTopic) {
                return res.status(400).send({status: false, msg: 'topic already exists'});
            }

        let savedRanking = await rankingModel.create(body);
        res.status(201).send({status: true, topic: savedRanking.topic,ranking:savedRanking.ranking})

    } catch (error) {
      res.status(501).send({ status: "failed", message: error.message });
    }
}
module.exports.create=create;


const getRank= async(req,res)=>{
    try{

        const topicNRank=await rankingModel.find()
        return res.status(200).send({ status: true, data: topicNRank})

    }catch (err) {
        res.status(501).send({ msg: "Error", error: err.message })
    }
}
module.exports.getRank=getRank