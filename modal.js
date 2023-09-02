import mongoose, { Schema }  from "mongoose";

const userSchema =  new Schema({

    name:{
        type:String,
        required:[true,"khali mat chhor be"],
    },
    address:{
        type:String,
    },
    phone:{
        type:Number,
    }
});

const  userModel = mongoose.model("bishnoi",userSchema);

export default userModel;