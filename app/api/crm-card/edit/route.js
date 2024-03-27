"use client";

import { getAccessToken } from "@/actions/authToken";
import { editLineItem } from "@/actions/helperFunction";

export const PATCH = async (req, res) => {
  try {
    const {
      lineItem,
      portalId,
      name,
      quantity,
      hs_product_id,
      recurringbillingfrequency,
      hs_recurring_billing_period,
      hs_discount_percentage,
    } = await req.json();

    const body = {
      properties: {
        name,
        quantity,
        hs_product_id,
        recurringbillingfrequency,
        hs_recurring_billing_period: `P${hs_recurring_billing_period}M`,
        hs_discount_percentage,
      },
    };

    const accessToken = await getAccessToken(Number(portalId));

    const response = await editLineItem(accessToken, body, lineItem);
    // console.log(response);
    return Response.json({ message: response });
  } catch (error) {
    console.log(error);
    return Response.json({ message: error.message });
  }
};
