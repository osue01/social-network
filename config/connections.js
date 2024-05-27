const { connect, connection } = require('mongoose');

//connection parameters to socialNetwork database
connect('mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export the connection
module.exports = connection;