import { getAccessToken } from "@/actions/authToken";
import { dropLineItem } from "@/actions/helperFunction";

export const POST = async (req, res) => {
  try {
    const lineItemId = req.nextUrl.searchParams.get("lineItemId");
    const portalId = req.nextUrl.searchParams.get("portalId");
    const accessToken = await getAccessToken(Number(portalId));
    await dropLineItem(accessToken, lineItemId);
    return Response.json({ message: "success" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
};
