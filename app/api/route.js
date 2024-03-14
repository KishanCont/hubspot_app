import { AUTHORIZATION_URL } from "@/constants";

export const GET = (request, response) => {
  // Redirect the user to the HubSpot OAuth 2.0 authorization URL
  return Response.redirect(new URL(AUTHORIZATION_URL));
};
