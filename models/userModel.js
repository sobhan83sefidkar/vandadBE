import mongoose from "mongoose";

const authenticationSchema = new mongoose.Schema(
    {
        username : {type : String , required : true , unique : true},
        password : {type : String , required : true},
        admin : {type : Boolean , default : false}
    }
)

export default mongoose.model("User" , authenticationSchema)