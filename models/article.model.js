const mongoose=require('mongoose');

const articleSchema=mongoose.Schema({

    

    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    publishedAt:{
        type:Date,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

    /*expire_at: {
        type: Date, default: Date.now, expires: 60
    }*/
    
})//,{ timestamps: true });

//articleSchema.index({ "expire_at": 1 }, { expireAfterSeconds: 5 });

module.exports=mongoose.model('Article',articleSchema);