"use server";

import { MONGO_DB_NAME, MONGO_URI } from "@/constants";
import { MongoClient } from "mongodb";
// Connection URI //Account_portalId
export async function getList(uri, databaseName) {
  // Create a new MongoClient
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const dbo = client.db(databaseName);
    const collections = dbo.listCollections().toString();
    return collections;
  } catch (error) {
    console.log(error);
  }
}

// getList(MONGO_URI, MONGO_DB_NAME).then((res) => console.log(res));

// const selectedCollection = "Kishan";
// async function getCollection(uri, databaseName, selectedCollection) {
//   // Create a new MongoClient
//   const client = await MongoClient.connect(uri);
//   const dbo = client.db(databaseName);
//   let query = {};
//   const collections = await dbo.collection(selectedCollection);
//   const documents = await collections.find(query).toArray();
//   console.log("Collection:");
//   documents.forEach((document) => {
//     console.log("Columns:", document.columnsName);
//     console.log("Rows:", document.rows);
//   });
//   // Print the list of collections̥
//   //console.log('Collections:', collections.map(collection => collection.name));
//   return dbo;
// }

// async function updateCollection(
//   uri,
//   databaseName,
//   selectedCollection,
//   collection
// ) {
//   // Create a new MongoClient
//   const client = await MongoClient.connect(uri);
//   const dbo = client.db(databaseName);
//   await dbo.collection(selectedCollection).updateMany(collection);
//   console.log("Collection:");
//   documents.forEach((document) => {
//     console.log("Columns:", document.columnsName);
//     console.log("Rows:", document.rows);
//   });
//   client.close();
// }
// async function dropCollection(uri, databaseName, selectedCollection) {
//   // Create a new MongoClient
//   const client = await MongoClient.connect(uri);
//   const dbo = client.db(databaseName);
//   await dbo.collection(selectedCollection).drop(function (err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("Collection deleted");
//     db.close();
//   });
//   client.close();
// }
// async function renameCollection(uri, databaseName, selectedCollection) {
//   // Create a new MongoClient
//   const client = await MongoClient.connect(uri);
//   const dbo = client.db(databaseName);
//   await dbo.collection(selectedCollection).rename(newname, function (err, res) {
//     if (err) throw err;
//     console.log("Collection deleted");
//     db.close();
//   });
//   client.close();
// }

// (async () => {
//   const db = await getCollection(MONGO_URI, MONGO_DB_NAME, selectedCollection);
//   db.client.close();
// })();
