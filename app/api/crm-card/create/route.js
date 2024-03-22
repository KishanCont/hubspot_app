import { getAccessToken } from "@/actions/authToken";
import { associateLineToDeal, createLineItem } from "@/actions/helperFunction";

export const POST = async (req, res) => {
  try {
    const body = await req.json();

    const { portalId, dealId } = body;
    const accessToken = await getAccessToken(Number(portalId));
    const lineItemId = await createLineItem(accessToken, body);
    const response = await associateLineToDeal(accessToken, dealId, lineItemId);
    if (!response) {
      return Response.json({ message: "error" });
    }

    return Response.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error.message });
  }
};
