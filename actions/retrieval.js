"use server";

import { MongoClient } from "mongodb";
import { createMongoConnection } from "./dbConnetion";
// Connection URI //Account_portalId
export async function getCollectionList(databaseName) {
  // Create a new MongoClient
  try {
    const dbClient = await createMongoConnection();
    const db = dbClient.db(databaseName);
    const collections = await db.listCollections().toArray();
    const documents = [];
    collections.map((collection) => {
      documents.push({
        name: collection.name,
        uuid: collection.info.uuid.toString(),
      });
    });

    return documents;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getCollectionData(databaseName, selectedCollection) {
  // Create a new MongoClient
  try {
    const dbClient = await createMongoConnection();
    const db = dbClient.db(databaseName);
    let query = {};
    const collections = db.collection(selectedCollection);
    const documents = await collections.find(query).toArray();
    let data = [];

    documents.map((document) => {
      data.push({
        id: document._id.toString(),
        billing_start_date: document.billing_start_date,
        term: document.term,
        billing_frequency: document.billing_frequency,
        quantity: document.quantity,
        discount: document.discount,
      });
    });
    dbClient.close();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateCollection(databaseName, selectedCollection, collection) {
  // Create a new MongoClient
  const client = await createMongoConnection();
  const dbo = client.db(databaseName);
  await dbo.collection(selectedCollection).updateMany(collection);
  console.log("Collection:");
  documents.forEach((document) => {
    console.log("Columns:", document.columnsName);
    console.log("Rows:", document.rows);
  });
  client.close();
}

export async function insertData(dbName, selectedCollection, data) {
  try {
    const client = await createMongoConnection();
    const dbo = client.db(dbName);
    await dbo.collection(selectedCollection).drop();
    const result = await dbo.collection(selectedCollection).insertMany(data);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
