import { getAccessToken } from "./authToken";
import axios from "axios";

export async function dropCollection(uri, databaseName, selectedCollection) {
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

export async function renameCollection(uri, databaseName, selectedCollection) {
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

export async function getProduct(productId, accessToken) {
  const getLineItems = `https://api.hubapi.com/crm/v3/objects/products/${productId}`;
  try {
    const response = await axios.get(getLineItems, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createProductCollection(dbClient, productId, portalId) {
  try {
    const accessToken = await getAccessToken(portalId);
    const product = await getProduct(productId, accessToken);
    await dbClient.createCollection(`${product.properties.name}_${productId}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
