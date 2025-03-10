import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.ATLAS_URI;
if (!uri) {
  throw new Error('MongoDB connection string is not defined in environment variables.');
}

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("pe05");

export default db;