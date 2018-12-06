const mongoose=require('mongoose');
var Blog=mongoose.model('Blog',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    createdAt:{
        type:Number,
        default:null
    },
    vote:{
        type:Number,
        default:0
    }
})
module.exports={Blog};