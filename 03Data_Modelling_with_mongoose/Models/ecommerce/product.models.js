import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
  },
  description : {
    type : String,
    required : true,
  },
  product_image : {
    type : String,
    required : true,
  },
  price : {
    type : Number,
    required : true,
    default : 0,
  },
  stock : {
    type : Number,
    default : 0,
  },
  //mera her ek product ek category se related ho
  category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category',
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
  },

} , {timestamps : true})

export const product = mongoose.model('product' , productSchema)


// This field is used to link a product to a specific category. 
// For example, a product like "Laptop" might belong to the "Electronics" category.
// mongoose.Schema.Types.ObjectId: This means that this field will store an ID (a unique identifier) of a document in another collection.
// ref: 'Category': This tells Mongoose that this ID belongs to a document in the Category collection.
// For example, the product might store category: "64fcb513a4f3dc2c0c82a456", which is the ID of the "Electronics" category in the Category collection.


// This field is used to track which user created or owns the product. For instance, if you’re building an eCommerce platform where sellers add products, this field links the product to the seller's account.
// mongoose.Schema.Types.ObjectId: Again, this stores an ID of another document, but this time it's for a user.
// ref: 'User': This tells Mongoose that the ID belongs to a document in the User collection.
// For example, the product might store user: "64fcad3c71a44b1b3458c231", which is the ID of the user who created the product.