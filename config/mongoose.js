//require library
const mongoose = require('mongoose');
// import env



//connect to db
mongoose.connect(`mongodb://localhost/socialnetwokDb`);

//accuire the connectiontion
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error in connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected to database");
});

module.exports = db;
