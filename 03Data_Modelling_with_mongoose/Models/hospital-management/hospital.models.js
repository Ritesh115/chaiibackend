import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name : {
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
  specializedIn :[ 
    {
    type : String ,
    required : true ,
  }
],
  //hospital has multiple doctors
  doctors : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : "Doctor" ,
  }],
  //hospital has multiple patients
  patients : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : "Patient" ,
  }],
  //hospital has multiple medical records
  medicalRecords : [{
    type : mongoose.Schema.Types.ObjectId ,
    ref : "MedicalRecord" ,
  }],

} , {timestamps : true})

export const Hospital = mongoose.model('Hospital', hospitalSchema);