const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations'); //dboper is short for database operations - gives us access to operations.js

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

//promise then method takes a callback function as its parameter
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

  console.log('Connected correctly to server');

  const db = client.db(dbname);

  //delete everything that is already in campsites collection - allows test app to start with fresh blank document so there aren't issues in the future with testing (developers call it drop, not delete)
  db.dropCollection('campsites')
  .then(result => {
    console.log('Dropped Collection', result); 
  })
  .catch(err => console.log("No collection to drop.")); //if no campsites to drop, we will log error but not close the connection
  
  dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
  .then(result => { 
    console.log('Insert Document:', result.ops); 
      
    return dboper.findDocuments(db, 'campsites');
  })
  .then(docs => {
    console.log('Found Documents:', docs); 

    return dboper.updateDocument(db, {name: "Breadcrumb Trail Campground" }, {description: "Updated Test Description"}, 'campsites');
  })
  .then(result => {
    console.log("Updated Document Count:", result.result.nModified); 

    return dboper.findDocuments(db, 'campsites');
  })
  .then(docs => { 
    console.log("Found Documents:", docs);

    return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites');
   })
  .then(result => {
    console.log('Delted Document Count:', result.deletedCount);

    return client.close();
  })
  .catch(err => {
    console.log(err);
    client.close();
  });      
})
.catch(err => console.log(err));