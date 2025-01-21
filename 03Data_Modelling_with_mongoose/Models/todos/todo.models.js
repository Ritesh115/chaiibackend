import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    //content: Represents the main text or description of the to-do item (e.g., "Buy groceries").
    content : {
      type : String ,
      required : true ,
    },
    complete : {
      type : Boolean,
      default : false ,
    },
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User" ,
    }, //createdBy: Links the to-do item to a user who created it.
    subTodos : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubTodo" ,
    }
  ]  //Array of Sub-Todos 
  },


  {
    timestamps : true,
  }
) ;

export const Todo = mongoose.model('Todo' , todoSchema);

//In database Todo will be stored as todos.