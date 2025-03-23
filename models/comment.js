import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        articleId : { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
        name : {type : String , required : true},
        comment : {type : String , required : true},
        isShow : {type : Boolean , default : false}
    } , {timestamps : true}
)

export default mongoose.model("Comment" , commentSchema)