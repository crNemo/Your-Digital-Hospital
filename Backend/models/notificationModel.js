import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user:{type:String,required:true},
    comment:{type:String,required:true}
})

const notiSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    date:{type:Number},
    user:{type:String},
    comments:[commentSchema]
})

const NotificationModel =  mongoose.models.notifications|| mongoose.model('notifications',notiSchema)
export default NotificationModel
