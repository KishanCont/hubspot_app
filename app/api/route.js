import { AUTHORIZATION_URL } from "@/constants";

export const GET = (req, res) => {
  try {
    console.log(AUTHORIZATION_URL);
    return Response.redirect(AUTHORIZATION_URL);
  } catch (error) {
    console.log(error);
  }
};
