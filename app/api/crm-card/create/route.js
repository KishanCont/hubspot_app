import { getAccessToken } from "@/actions/authToken";
import { associateLineToDeal, createLineItem } from "@/actions/helperFunction";

export const POST = async (req, res) => {
  try {
    const body = await req.json();

    const { portalId, dealId } = body;
    const {
      quantity,
      hs_product_id,
      recurringbillingfrequency,
      hs_recurring_billing_period,
      hs_discount_percentage,
    } = body;

    const newBody = {
      properties: {
        quantity,
        hs_product_id,
        recurringbillingfrequency,
        hs_recurring_billing_period,
        hs_discount_percentage,
      },
    };

    console.log(newBody);

    const accessToken = await getAccessToken(Number(portalId));

    const lineItemId = await createLineItem(accessToken, newBody);
    if (!lineItemId) {
      return Response.json({ message: "error" });
    }

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
