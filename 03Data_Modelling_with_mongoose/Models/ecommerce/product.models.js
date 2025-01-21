import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  price : {
    type : Number,
    required : true,
  },
  quantity : {
    type : Number,
    required : true,
  },
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category',
    required : true,
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true,
  }
} , {timestamps : true})

export const product = mongoose.model('product' , productSchema)