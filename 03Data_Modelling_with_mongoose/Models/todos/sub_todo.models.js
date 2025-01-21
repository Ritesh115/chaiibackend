import mongoose from 'mongoose';

const subTodoSchema = new mongoose.Schema( {
  content : {
    type : string ,
    require : true ,
  },
  complete : {
    type : Boolean , 
    default : false,
  }

} , {timestamps : true})

export const  SubTodo = mongoose.model("SubTodo" , subTodoSchema)





