const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const uri = 'mongodb+srv://jackyyang:Yy0931941514@cluster0.yt03ehm.mongodb.net/?retryWrites=true&w=majority&maxPoolSize=200'


const mongoConnect = callback => {
    MongoClient.connect(uri, { useUnifiedTopology: true })
      .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };
  
  const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'No database found!';
  };
  
  exports.mongoConnect = mongoConnect;
  exports.getDb = getDb;
  