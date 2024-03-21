import { generateSlug } from "@/lib/utils";
import axios from "axios";
import { getAccessToken } from "./authToken";

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

    console.log("Data", response.data);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createProductCollection(dbClient, objectId, portalId) {
  try {
    const accessToken = await getAccessToken(portalId);
    const product = await getProduct(objectId, accessToken);
    if (!product) {
      throw new Error("Not get product");
    }
    await dbClient.createCollection(
      generateSlug(`${product.properties.name}_${objectId}`)
    );
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

export async function dropCollection(dbClient, objectId, portalId) {
  // Create a new MongoClient
  try {
    const accessToken = await getAccessToken(portalId);

    if (!accessToken) {
      return console.error("Not get access token");
    }

    const product = await getProduct(objectId, accessToken);

    if (!product) {
      throw new Error("Not get product");
    }

    await dbClient
      .collection(generateSlug(`${product.properties.name}_${objectId}`))
      .drop();
    dbClient.close();
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
  // await dbo.collection(selectedCollection).drop(function (err, delOK) {
  //   if (err) throw err;
  //   if (delOK) console.log("Collection deleted");
  //   db.close();
  // });
  // client.close();
}

// const client = await createMongoConnection();
// client.db(`Account_${portalId}`);
