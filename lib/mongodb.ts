import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB URI
const dbName = 'referralDB'; // Update with your database name

let client: MongoClient;

async function connect() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

async function getDB() {
  const client = await connect();
  return client.db(dbName);
}

export { getDB };
