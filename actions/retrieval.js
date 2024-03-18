"use server";

import { MongoClient } from "mongodb";
// Connection URI //Account_portalId
export async function getList(uri, databaseName) {
  // Create a new MongoClient
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const dbo = client.db(databaseName);
    const collections = await dbo.listCollections().toArray();
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

export async function getCollection(uri, databaseName, selectedCollection) {
  // Create a new MongoClient
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const dbo = client.db(databaseName);
    let query = {};
    const collections = await dbo.collection(selectedCollection);
    const documents = await collections.find(query).toArray();
    let data = [];

    documents.map((document) => {
      data.push({
        id: document._id.toString(),
        tableName: document.tableName,
        columnsName: document.columnsName,
        rows: document.rows,
      });
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateCollection(
  uri,
  databaseName,
  selectedCollection,
  collection
) {
  // Create a new MongoClient
  const client = await MongoClient.connect(uri);
  const dbo = client.db(databaseName);
  await dbo.collection(selectedCollection).updateMany(collection);
  console.log("Collection:");
  documents.forEach((document) => {
    console.log("Columns:", document.columnsName);
    console.log("Rows:", document.rows);
  });
  client.close();
}
async function dropCollection(uri, databaseName, selectedCollection) {
  // Create a new MongoClient
  const client = await MongoClient.connect(uri);
  const dbo = client.db(databaseName);
  await dbo.collection(selectedCollection).drop(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
  client.close();
}
async function renameCollection(uri, databaseName, selectedCollection) {
  // Create a new MongoClient
  const client = await MongoClient.connect(uri);
  const dbo = client.db(databaseName);
  await dbo.collection(selectedCollection).rename(newname, function (err, res) {
    if (err) throw err;
    console.log("Collection deleted");
    db.close();
  });
  client.close();
}
