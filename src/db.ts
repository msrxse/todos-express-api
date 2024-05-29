import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb://todos-express-user:todos-express-psswd@localhost:27017/admin',

} = process.env; 

export const client = new MongoClient(MONGO_URI);
export const db = client.db();

// we can just access the db and the first 
// time you access a collection it will automatically 
// connect to the DB
// SO we don't need this next line
// await client.connect()