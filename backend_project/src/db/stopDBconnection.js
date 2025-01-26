import mongoose from "mongoose";

// Function to stop the database connection
function stopDBConnection() {
  mongoose.disconnect()
      .then(() => {
          console.log('Database connection closed.');
      })
      .catch((error) => {
          console.error('Error closing the database connection:', error);
      });
}

export default stopDBConnection;