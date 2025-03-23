import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        username : {type : String , required : true},
        engineers : {type : String , required : true},
        entery : {type : String , required : true},
        exit : {type : String , required : true},
        report : {type : String , required : true}
    } , {timestamps : true}
)

export default mongoose.model("Report" , reportSchema)