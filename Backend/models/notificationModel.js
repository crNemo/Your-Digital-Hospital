import mongoose from "mongoose";

const notiSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    date:{type:Number}
})

const NotificationModel =  mongoose.models.notifications|| mongoose.model('notifications',notiSchema)
export default NotificationModel
