const mongoose=require('mongoose')

const rankSchema=new mongoose.Schema({
    topic:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    ranking:{
        type:Number,
        required:true,
        trim:true
    }
    
})
module.exports = mongoose.model('Register', rankSchema);