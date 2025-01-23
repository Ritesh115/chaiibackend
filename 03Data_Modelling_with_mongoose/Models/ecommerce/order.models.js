import mongoose from "mongoose";

//mini schema or models
const orderItemsSchema = new mongoose.Schema({
  //every product has a unique ID we are accessing its IDs
  productId : {
    type : mongoose.Schema.types.ObjectId,
    ref : "product" ,  
  },
  quantity : {
    type : Number,
    required : true,
  }
})



const orderSchema= new mongoose.Schema({
   orderPrice : {
    type : Number,
    required : true,
   },
   customer : {
    type  : mongoose.Schema.Types.ObjectId,
    ref : "User" , 
   },
   //kon kon se order place kar rahe hai and kitn kar rahe hai. so to keep track of it we created an miniSchema.
   orderItems : {
       types : [orderItemsSchema],
   },
   address : {
         type : String,
         required : true,
   },
   status : {
    type : String,
    //enumeration means many
    enum : ["PENDING" , "CANCELLED" , "DELIVERED"],
    default : "PENDING"
   }

  

} , {timestamps : true});

export const Order = mongoose.model('Order' , orderSchema);