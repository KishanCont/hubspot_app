"use server";

import axios from "axios";
import { getAccessToken } from "./authToken";

export async function getRecords(dealId, portalId) {
  const getLineItems = `https://api.hubapi.com/crm/v3/objects/line_items?associations.deals=${dealId}`;
  try {
    const accessToken = await getAccessToken(portalId);
    const response = await axios.get(getLineItems, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let data = [];
    response.data.results.map((item, index) => {
      data.push({
        objectId: Number(item.id),
        title: `Product ${index + 1}`,
        link: "https://hubspot-app-sapm.onrender.com/",
        quantity: Number(item.properties.quantity),
        amount: Number(item.properties.amount),
        type: "IFRAME",
        actions: [
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: `https://hubspot-app-sapm.onrender.com/dashboard?portalId=${portalId}&dealId=${dealId}`,
            label: "View",
          },
        ],
      });
    });

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function insertDocuments(db, collectionName, documents) {
  try {
    const collection = db.collection(collectionName);
    await collection.insertMany(documents);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}
