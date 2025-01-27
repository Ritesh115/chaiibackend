import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use( cors(
  {
    origin : process.env.CORS_ORIGIN,
    credentials : true
  }
) )

// express middleware config.
app.use( express.json( {limit : "16kb"} ) );
//URL Encoded Data (for form submissions)
app.use( express.urlencoded( {extended : true , limit : "16kb"} ) );
//Static Files (Serve Images, CSS, JS)
app.use( express.static( "public" ) );

app.use( cookieParser() );



 





export default app;
