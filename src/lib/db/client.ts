import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "";

let mongoClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!mongoClient) {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
  }
  return mongoClient;
}

export default getMongoClient();