"use server";

import axios from "axios";

export async function getItemList(accessToken, dealId) {
  try {
    const response = await axios({
      method: "get",
      //use dealId  url:`https://api.hubapi.com/crm/v3/objects/deals/${dealId/associations/line_items`,
      url: `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/line_items`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.results.map((item) => item.id);
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.message
    );
    throw error;
  }
}
export async function getItemRecord(list, accessToken) {
  try {
    let records = [];
    for (const itemId of list) {
      const response = await axios({
        method: "get",
        url: `https://api.hubapi.com/crm/v3/objects/line_items/${itemId}?properties=Name,amount,quantity,hs_discount_percentage,price`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      records.push(response.data);
    }
    return records;
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.message
    );
    throw error;
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
