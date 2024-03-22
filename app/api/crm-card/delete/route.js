import { getAccessToken } from "@/actions/authToken";
import { dropLineItem } from "@/actions/helperFunction";

export const DELETE = async (req, res) => {
  try {
    const lineItemId = req.nextUrl.searchParams.get("lineItemId");
    const portalId = req.nextUrl.searchParams.get("portalId");
    const accessToken = await getAccessToken(Number(portalId));

    const response = await dropLineItem(accessToken, lineItemId);
    if (!response) {
      return Response.json({ message: "Not Deleted" });
    }
    return Response.json({ message: "success" });
  } catch (error) {
    return Response.json({ error: error.message });
  }
};
