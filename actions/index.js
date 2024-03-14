"use server";

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
const dbName = process.env.DB_NAME;
const url = process.env.MONGO_URI;

async function saveCollection(collectionName, docToInsert) {
  const db = await createCollection(url, dbName, collectionName);
  await insertDocuments(db, collectionName, docToInsert);
  db.client.close();
}

// saveCollection("table", [
//   {
//     columnsName: [
//       {
//         columnName: "Name",
//         columnType: "input",
//         dataType: "text",
//       },
//       {
//         columnName: "Name",
//         columnType: "input",
//         dataType: "text",
//       },
//     ],
//   },
// ]);

// export default saveCollection;

export default saveCollection;
