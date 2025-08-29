const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; 
const dbName = 'Adminlog';

let client;

async function dbconnect() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
    console.log('MongoDB connected');
  }
  const db = client.db(dbName);
  return db;
}

module.exports = dbconnect;
