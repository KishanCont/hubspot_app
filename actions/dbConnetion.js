import { MONGO_URI } from "@/constants";
import { MongoClient } from "mongodb";

export async function createMongoConnection() {
  try {
    const client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    await client.connect();
    console.log("MongoDB Connection Successful");
    return client;
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
