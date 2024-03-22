import { MONGO_URI } from "@/constants";
import { MongoClient } from "mongodb";

export async function createMongoConnection() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();

    return client;
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
