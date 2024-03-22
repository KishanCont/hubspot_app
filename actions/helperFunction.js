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
        url: `https://api.hubapi.com/crm/v3/objects/line_items/${itemId}?properties=Name,amount,quantity,hs_discount_percentage,price,hs_product_id`,
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

export async function dropLineItem(accessToken, LineItemId) {
  try {
    body = { inputs: [{ id: { LineItemId } }] };
    const response = await axios({
      method: "post",
      url: "https://api.hubapi.com/crm/v3/objects/line_items/batch/archive",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    });
    return response;
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.message
    );
    throw error;
  }
}

export async function createLineItem(accessToken, body) {
  try {
    body = {
      properties: {
        name: " My VS Deal",
        price: "800",
        quantity: "5",
        hs_product_id: "2696558198",
        recurringbillingfrequency: "monthly",
        hs_recurring_billing_period: "P24M",
        hs_discount_percentage: "15",
      },
    };
    const response = await axios({
      method: "post",
      url: "https://api.hubapi.com/crm/v3/objects/line_items",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    });
    return response.data.id;
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.message
    );
    throw error;
  }
}
export async function associateLineToDeal(accessToken, dealId, LineItemId) {
  try {
    body = {
      inputs: [
        {
          from: {
            id: { LineItemId },
          },
          to: {
            id: { dealId },
          },
          type: "line_item_to_deal",
        },
      ],
    };
    const response = await axios({
      method: "post",
      url: "https://api.hubapi.com/crm/v3/associations/Line_items/Deal/batch/create",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.message
    );
    throw error;
  }
}
