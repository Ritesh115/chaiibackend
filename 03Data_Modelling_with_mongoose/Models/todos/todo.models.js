import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content : {
      type : string ,
      require : true ,
    },
    complete : {
      type : Boolean,
      
    }
  },


  {
    timestamps : true,
  }
) ;

export const Todo = mongoose.model('Todo' , todoSchema);

//In database Todo will be stored as todos.