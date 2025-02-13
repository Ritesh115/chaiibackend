// this is a  middleware function that will handle the promise rejection.

//It is used to handle asynchronous errors in Express.js, so you don’t have to write try...catch in every route.

const asyncHandler = ( fun ) => {

     return (req, res, next) => { // Returns a middleware function
          Promise
            .resolve(fun(req, res, next)) // Executes 'fun' and ensures it resolves to a Promise
            .catch(
               (err) => {next(err)}
                 ); // If an error occurs, it is passed to Express error handling middleware
        };

 }

export{ asyncHandler } ; 