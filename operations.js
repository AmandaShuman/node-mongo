//db we are using, document we want to insert, collection document is in, and callback function that will be called at the end of each method
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection); //gives application a way to access collection in a given database
  return coll.insertOne(document); //this will now return a promise as its return value
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection); 
  return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};

//these are similar to CRUD - insert/create, find/read, update/update, and remove/delete