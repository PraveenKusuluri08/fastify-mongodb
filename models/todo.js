const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: false
        },
        description:{
          type:String,
          required:true,
          trim:false
        },
        status:{
            type:Boolean,
            default:false,
        },
        completedAt:{
            type:Date,
            default:null,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },{timestamps:true}
)

module.exports = mongoose.model("Todo",todoSchema)