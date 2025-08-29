const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; 
const dbName = 'Demo1';

const client = new MongoClient(url);

async function dbconnect() {
  await client.connect(); 
  const db = client.db(dbName);
  return db.collection('products'); 
}

module.exports = dbconnect;
