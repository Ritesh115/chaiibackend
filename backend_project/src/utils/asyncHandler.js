// this is a  middleware function that will handle the promise rejection.

const asyncHandler = ( fun ) => {

     return   (req , res , next) => {
          Promise          //in this we are directly handling the promise.
          .resolve( fun(req , res , next) ) //we call the function and pass the req , res and next to it.
          .catch(
               (err) => {next(err)} //if there is an error then we pass it to the next middleware.
          )

     }

}

export{ asyncHandler } ; 