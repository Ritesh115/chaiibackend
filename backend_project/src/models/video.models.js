import mongoose from 'mongoose';
import mongooseaggregatePaginate from 'mongoose-aggregate-paginate-v2';


const videoSchema = new mongoose.Schema({
  videoFile  : {
    type : String ,  //cloudinary url
    required : true ,
  },
  thumbnail : { 
    type : String ,  // cloudinary url
    required : true ,
  },
  title : {
    type : String ,
    required : true ,
  },
  description : {
    type : String ,
    required : true ,
  },
  duration : {
    type : Number ,  // cloudinary url
    required : true ,
  },
  views : {
    type : Number , // cloudinary url
    default : 0 ,
  },
  isPublished : { //video is public or private
       type : Boolean ,
        default : true ,
  },
  owner : {
    type : mongoose.Schema.Types.ObjectId  ,
    ref : 'User' ,
  }
  
} , { timestamps: true });



videoSchema.plugin(mongooseaggregatePaginate);



export const Video = mongoose.model('Video', videoSchema);