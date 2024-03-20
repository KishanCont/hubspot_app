import { getAccessTokenWithRefreshToken } from "@/actions/authToken";
import {
  createDatabase,
  exchangeAuthorizationCodeForTokens,
  getAccountInfo,
  saveRefreshTokenToMongo,
} from "@/actions/install";

export const GET = async (req, res) => {
  const authorizationCode = req.nextUrl.searchParams.get("code");

  // Extract the authorization code from the query parameters
  if (authorizationCode) {
    try {
      const tokens = await exchangeAuthorizationCodeForTokens(
        authorizationCode
      );
      const refreshToken = tokens.refresh_token;
      const accessToken = await getAccessTokenWithRefreshToken(refreshToken);
      // Use the access token to make requests to the HubSpot API
      const accountInfo = await getAccountInfo(accessToken);

      // Extract organization name and ID from the accountInfo
      const portalId = accountInfo.portalId;

      await saveRefreshTokenToMongo(refreshToken, portalId);
      await createDatabase(portalId);

      return Response.redirect(`${process.env.DOMAIN}/api/success`);
    } catch (error) {
      console.log(error);
      return Response.json({ error: error.message, code: authorizationCode });
    }
  }

  return Response.json("No authorization code provided");
};
