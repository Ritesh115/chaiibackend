
const asyncHandler = ( fun ) => {

     return   (req , res , next) => {
          Promise          //inthis we are directly handling the promise.
          .resolve( fun(req , res , next) )
          .catch(
               (err) => {next(err)}
          )

     }

}

export{ asyncHandler } ; 