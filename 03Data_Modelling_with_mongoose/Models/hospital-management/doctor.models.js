import mongoose from "mongoose";

//miniSchema
const timePeriodSchema = new mongoose.Schema({
  hospital : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "Hospital" ,
  },
  timeSpentInHospital : {
    type : Number ,
    required : true ,
    default : 0 ,
  }
})


const doctorSchema = new mongoose.Schema({
  name : {
    type : String ,
    required : true ,
  },
  age : {
    type : Number ,
    required : true ,
  },
  specialization : {
    type : String ,
    required : true ,
  },
  address : {
    type : String ,
    required : true ,
  },
  contact : {
    type : Number ,
    required : true ,
  },
  gender : {
    type : String ,
    enum : ["M" , "F" , "O"] ,
    required : true ,
   },
   experienceInYears : {
    type : Number ,
    required : true ,
    default : 0 ,
   },
   //doctor works in multiple hospitals
   worksInHospitals : [timePeriodSchema] , //array of timePeriodSchema
   
   //doctor treats multiple patients
   patient : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : "Patient" ,
   },

   // want to save the records of time duration they spend in multiple hospitals.


} , {timestamps : true})

export const Doctor = mongoose.model('Doctor', doctorSchema);