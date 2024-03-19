"use server";

import { MONGO_URI } from "@/constants";
import { MongoClient } from "mongodb";

async function createMongoConnection(url, databaseName) {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("MongoDB Connection Successful");
    return client.db(databaseName);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function createTable(db, collectionName) {
  try {
    await db.createCollection(collectionName);
    console.log("Collection created");
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

async function insertDocument(db, collectionName, documents) {
  try {
    const collection = db.collection(collectionName);
    await collection.insertOne(documents);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
//const collectionName = "Glasses";

const documentsToInsert = [
  {
    input_name: "Sample Chair",
    input_email: "sample@email.com",
    output_priority: "high",
    output_percentage: 15,
  },
  {
    input_name: "Chair 2",
    input_email: "chair2@email.com",
    output_priority: "low",
    output_percentage: 5,
  },
];

async function saveRefreshTokenToMongo(refreshToken, portalId) {
  const docToInsert = { account: portalId, refresh: refreshToken };
  const collectionName = "RefreshTokens";
  const db = await createMongoConnection(MONGO_URI, "Token_Database");

  try {
    const collection = db.collection(collectionName);
    if (await collection.find({ account: portalId })) {
      await collection.updateOne(
        { account: portalId },
        { $set: { refresh: refreshToken } },
        { upsert: true }
      );
      console.log("Data updated successfully");
    } else {
      await collection.insertOne(docToInsert);
      console.log("Data inserted successfully");
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function saveTestData(testProduct) {
  const docToInsert = testProduct;
  const collectionName = "test_product";
  const db = await createMongoConnection(MONGO_URI, "webhook");
  await createTable(db, collectionName);
  await insertDocument(db, collectionName, docToInsert);
  db.client.close();
}

async function createDatabase(portalId) {
  const dbName = `Account_${portalId}`;
  const connectionUrl = MONGO_URI + dbName;
  try {
    const client = new MongoClient(connectionUrl, { useUnifiedTopology: true });
    await client.connect();
    await insertDocuments(
      client.db(dbName),
      "Test_collection",
      documentsToInsert
    );
    console.log("MongoDB Connection Successful");
    client.close();
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function createWebhookDatabase(dbName) {
  const connectionUrl = MONGO_URI + dbName;
  try {
    const client = new MongoClient(connectionUrl, { useUnifiedTopology: true });
    await client.connect();
    await insertDocuments(client.db(dbName), "test_product", documentsToInsert);
    console.log("MongoDB Connection Successful");
    client.close();
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

export {
  saveRefreshTokenToMongo,
  createDatabase,
  createWebhookDatabase,
  saveTestData,
};
