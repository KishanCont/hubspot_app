"use server";

import { REFRESH_TOKEN } from "@/constants";
import axios from "axios";

export async function getRecords(dealId) {
  const getLineItems = `https://api.hubapi.com/crm/v3/objects/line_items?associations.deals=${dealId}`;
  try {
    const data = await getAccessToken(REFRESH_TOKEN);
    const response = await axios.get(getLineItems, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
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
