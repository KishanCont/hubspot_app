import { createDatabase, saveRefreshTokenToMongo } from "@/actions/database";
import {
  exchangeAuthorizationCodeForTokens,
  getAccessToken,
  getAccountInfo,
} from "@/actions/helperFunction";

export const GET = async (req, res) => {
  const authorizationCode = req.nextUrl.searchParams.get("code");
  // Extract the authorization code from the query parameters
  if (authorizationCode) {
    try {
      const tokens = await exchangeAuthorizationCodeForTokens(
        authorizationCode
      );
      const refreshToken = tokens.refresh_token;
      const accessToken = (await getAccessToken(refreshToken)).access_token;
      // Use the access token to make requests to the HubSpot API
      const accountInfo = await getAccountInfo(accessToken);
      console.log(accountInfo);
      // Extract organization name and ID from the accountInfo
      const orgName = accountInfo.accountType;
      const orgId = accountInfo.portalId;
      // You can save or use the orgName and orgId as needed
      console.log("Organization Name:", orgName);
      console.log("Organization ID:", orgId);

      await saveRefreshTokenToMongo(refreshToken, orgId);
      await createDatabase(orgId);

      return Response.redirect(`${process.env.DOMAIN}/api/success`);
    } catch (error) {
      console.log(error);
      return Response.json({ error: error.message, code: authorizationCode });
    }
  }

  return Response.json("No authorization code provided");
};
