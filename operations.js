const assert = require('assert').strict;

//db we are using, document we want to insert, collection document is in, and callback function that will be called at the end of each method
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection); //gives application a way to access collection in a given database
  coll.insertOne(document, (err, result) => {
    assert.strictEqual(err, null);
    callback(result); //callback function named callback will be defined elsewhere from another place in the code where a call to this insert document is made. Delivering result to the callback so callback can do what it needs to do.
  });
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection); 
  coll.find().toArray((err, docs) => {
    assert.strictEqual(err, null);
    callback(docs);
  });
};

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => { //document is JS object that is passed in to figure out which document to delete
    assert.strictEqual(err, null);
    callback(result); //will get an object about info that was deleted
  });
};

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => { //$set operator will write over existing info, 3rd parameter is for us to pass in certain optional configureations
    assert.strictEqual(err, null);
    callback(result);
  });
};

//these are similar to CRUD - insert/create, find/read, update/update, and remove/delete