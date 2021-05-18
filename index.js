const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations'); //dboper is short for database operations - gives us access to operations.js

const url = 'mongodb://localhost:27017/';
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

    //insert document into that collection
    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites', result => { //result is inline function definition - we haven't called it yet
      console.log('Insert Document:', result.ops); 
      
      dboper.findDocuments(db, 'campsites', docs => {
        console.log('Found Documents:', docs); //will log everything in campsites collection

        dboper.updateDocument(db, {name: "Breadcrumb Trail Campground" }, //look for the document with name and update the description field of that document - will only update single doc (if more than one code will break)
          {description: "Updated Test Description"}, 'campsites', result => {
            console.log("Updated Document Count:", result.result.nModified); 

            dboper.findDocuments(db, 'campsites', docs => { //get list of all docs in campsites collection
              console.log("Found Documents:", docs);

              dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites', result => {
                console.log('Delted Document Count:', result.deletedCount);

                client.close();
              });
            });
          }
        );
      });
    });
  });
});