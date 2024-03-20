"use server";

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "@/constants";
import { createMongoConnection } from "./dbConnetion";
import axios from "axios";

export async function createDatabase(portalId) {
  const dbName = `Account_${portalId}`;
  try {
    const dbClient = await createMongoConnection();
    const db = dbClient.db(dbName);
    dbClient.close();
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

export async function saveRefreshTokenToMongo(refreshToken, portalId) {
  try {
    const docToInsert = { account: portalId, refresh: refreshToken };
    const collectionName = "RefreshTokens";
    const dbClient = await createMongoConnection();
    const db = dbClient.db("Token_Database");
    const collection = db.collection(collectionName);
    const data = await collection.findOne({ account: portalId });
    if (data) {
      await collection.updateOne(
        { account: portalId },
        { $set: { refresh: refreshToken } },
        { upsert: true }
      );
      console.log("Data updated successfully");
      dbClient.close();
    } else {
      await collection.insertOne(docToInsert);
      console.log("Data inserted successfully");
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

export async function exchangeAuthorizationCodeForTokens(authorizationCode) {
  // Use the authorization code to obtain the access and refresh tokens
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code", authorizationCode);
  try {
    const response = await axios({
      method: "POST",
      url: "https://api.hubapi.com/oauth/v1/token",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: params,
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

export async function getAccountInfo(accessToken) {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/integrations/v1/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting account information:", error.message);
    throw error;
  }
}
