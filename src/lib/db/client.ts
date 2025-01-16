import { MongoClient } from "mongodb";

declare global {
  var _mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGO_URI || "";

const mongo = global._mongoClient ?? new MongoClient(uri);

if (!global._mongoClient) {
  global._mongoClient = mongo;
}

export default mongo.connect();