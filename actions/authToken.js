"use server";

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "@/constants/";
import { createMongoConnection } from "./dbConnetion";
import axios from "axios";

export async function getAccessToken(portalId) {
  // Use the authorization code to obtain the access and refresh tokens

  try {
    const dbClient = await createMongoConnection();
    const db = dbClient.db("Token_Database");
    const collection = db.collection("RefreshTokens");
    const data = await collection.findOne({ account: portalId });
    const accessToken = await getAccessTokenWithRefreshToken(data.refresh);
    dbClient.close();
    return accessToken;
  } catch (error) {
    console.error("Not get access token", error.message);
  }
}

export async function getAccessTokenWithRefreshToken(refreshToken) {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("refresh_token", refreshToken);

    const response = await axios({
      method: "POST",
      url: "https://api.hubapi.com/oauth/v1/token",
      headers: {
        //'Accept':'Application/json',
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: params,
    });

    return response.data.access_token;
  } catch (error) {
    console.log(error.message);
  }
}
