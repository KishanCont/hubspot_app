import { getAccessToken } from "@/actions/authToken";
import {
  getItemList,
  getItemRecord,
  getRecords,
} from "@/actions/helperFunction";

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
            uri: `https://hubspot-app-sapm.onrender.com/dashboard/edit?lineItemId=${item.id}&hsProductId=${item.properties.hs_product_id}&portalId=${portalId}`,
            label: "Edit",
          },
          {
            type: "CONFIRMATION_ACTION_HOOK",
            confirmationMessage: "Are you sure you want to delete this ticket?",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            httpMethod: "DELETE",
            associatedObjectProperties: ["protected_account"],
            uri: `https://hubspot-app-sapm.onrender.com/api/crm-card/delete?lineItemId=${item.id}&portalId=${portalId}`,
            label: "Delete",
          },
        ],
        secondaryActions: [
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: `https://hubspot-app-sapm.onrender.com/dashboard/create?portalId=${portalId}&dealId=${associatedObjectId}`,
            label: "Create Line Items",
          },
          {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: `https://hubspot-app-sapm.onrender.com/dashboard?portalId=${portalId}&dealId=${associatedObjectId}`,
            label: "Edit Collections",
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
