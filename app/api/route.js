import { AUTHORIZATION_URL } from "@/constants";

export const GET = (req, res) => {
  try {
    return Response.redirect(AUTHORIZATION_URL);
  } catch (error) {
    console.log(error);
  }
};
