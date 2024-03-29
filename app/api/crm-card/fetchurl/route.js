import { getAccessToken } from "@/actions/authToken";
import {
  getItemList,
  getItemRecord,
  getRecords,
} from "@/actions/helperFunction";
import { DOMAIN } from "@/constants";
import { generateSlug } from "@/lib/utils";

export const GET = async (req, res) => {
  try {
    const associatedObjectId =
      req.nextUrl.searchParams.get("associatedObjectId");
    const portalId = req.nextUrl.searchParams.get("portalId");
    const userId = req.nextUrl.searchParams.get("userId");

    if (!associatedObjectId || !portalId || !userId) {
      return Response.json({
        message: "Fields are required",
      });
    }

    const accessToken = await getAccessToken(Number(portalId));

    const list = await getItemList(accessToken, associatedObjectId);

    const record = await getItemRecord(list, accessToken);

    let data = [];
    record.map((item, index) => {
      data.push({
        objectId: Number(item.id),
        title: item.properties.name,
        link: null,
        unitPrice: Number(item.properties.price),
        quantity: Number(item.properties.quantity),
        discount: `${item.properties.hs_discount_percentage || 0}%`,
        amount: Number(item.properties.amount),
        actions: [
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: `${DOMAIN}/dashboard/edit?lineItemId=${item.id}&hsProductId=${
              item.properties.hs_product_id
            }&portalId=${portalId}&name=${generateSlug(
              item.properties.name
            )}&dealId=${associatedObjectId}`,
            label: "Edit",
          },
          {
            type: "CONFIRMATION_ACTION_HOOK",
            confirmationMessage: "Are you sure you want to delete this ticket?",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            httpMethod: "DELETE",
            associatedObjectProperties: ["protected_account"],
            uri: `${DOMAIN}/api/crm-card/delete?lineItemId=${item.id}&portalId=${portalId}`,
            label: "Delete",
          },
        ],
      });
    });

    if (!record) {
      return Response.json({
        message: "No record found",
      });
    }

    return Response.json({
      results: data,
      secondaryActions: [
        {
          type: "IFRAME",
          width: 890,
          height: 748,
          uri: `${DOMAIN}/dashboard/create?portalId=${portalId}&dealId=${associatedObjectId}`,
          label: "Create Line Items",
        },
        {
          type: "IFRAME",
          width: 890,
          height: 748,
          uri: `${DOMAIN}/dashboard?portalId=${portalId}&dealId=${associatedObjectId}`,
          label: "Edit Collections",
        },
      ],
    });
  } catch (error) {
    return Response.json({
      message: error.message,
    });
  }
};

export const dynamic = "force-dynamic";

// export const updateRecords = async (dealId, accessToken) => {
//   const getLineItems = `https://api.hubapi.com/crm/v3/objects/line_items?associations.deals=${dealId}`;
//   try {
//     const response = await axios.post(getLineItems, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return Response.json
//   } catch (error) {
//     console.error(error.message);
//   }
// };
