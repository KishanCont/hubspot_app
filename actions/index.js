"use server";

import { MONGO_DB_NAME, MONGO_URI } from "@/constants";
import { MongoClient } from "mongodb";
async function createCollection(url, dbName, collectionName) {
  try {
    const client = await MongoClient.connect(url);
    let dbo = client.db(dbName);
    await dbo.createCollection(collectionName);
    console.log("Collection created");
    return client.db(dbName);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function insertDocuments(db, collectionName, documents) {
  try {
    const collection = db.collection(collectionName);
    await collection.insertMany(documents);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

//const collectionName = "Glasses";

async function saveCollection(collectionName, docToInsert) {
  const db = await createCollection(MONGO_URI, MONGO_DB_NAME, collectionName);
  await insertDocuments(db, collectionName, docToInsert);
  db.client.close();
}

export default saveCollection;
