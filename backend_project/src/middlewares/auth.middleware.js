import {asyncHandler} from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const verifyjwt = asyncHandler( async (req , res , next)=>{
     
  // if user is logged in , token is stored in cookies , then we will get token from cookies and fetch user data from token.
    const token =  req.cookies?.accessToken || req.headers('Authorization') ?.replace('Bearer ' , '') ;

    if(!token) return res.status(401).json({message : 'No token provided'});

// if token is provided then we will verify token and get user data from token.

  const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET) ;


        
} );


export {verifyjwt} ;