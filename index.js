//will act as a client for the Mongo server
const MongoClient = require('mongodb').MongoClient;
//mongo requires a core module from node called assert
const assert = require('assert').strict;

//set up a connection to the mongodb server - 27017 is the port number in which the server is running
const url = 'mongodb://localhost:27017/';
//need to give name of database to connect to
const dbname = 'nucampsite';

//to access server to mongoClient - 1st argument is url; 2nd is object that sets various options (useUnifiedTopology is good to use to help with deprecation); 3rd is a callback function
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //first check to see that error is not null - 1st argument is value checking, 2nd is the expected value checking against to see if 1st argument strictly equals the 2nd
  //if assert fails, it will throw an error and terminate the entire application & will console.log error
  assert.strictEqual(err, null); //like shorthand for if(error===null) and so on

  console.log('Connected correctly to server');

  const db = client.db(dbname); //method connects to the db database

  //delete everything that is already in campsites collection - allows test app to start with fresh blank document so there aren't issues in the future with testing (developers call it drop, not delete)
  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null);
    console.log('Dropped Collection', result); //true if it was successful

    const collection = db.collection('campsites'); //recreate campsites collection

    //insert document into that collection
    collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
    (err, result) => {
      assert.strictEqual(err, null);
      console.log('Insert Document:', result.ops); //ops is short for operations - this case will contain an array with document that was inserted

      //list documents in the collection using find method
      collection.find().toArray((err, docs) => { //to get all items leave find parameter list empty
        assert.strictEqual(err, null); //toArray method will convert document to an array of objects so we can console.log it
        console.log('Found Documents:', docs);
        client.close(); //closes connection to server
      });
    });
  });
});