import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title : {type : String , required : true , unique : true},
        img : {type : String , required : true},
        text : {type : String , required : true},
        view : [String],
    }, {timestamps : true}
)

export default mongoose.model("Article" , articleSchema)