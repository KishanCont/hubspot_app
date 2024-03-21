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
            uri: `https://hubspot-app-sapm.onrender.com/dashboard?portalId=${portalId}&dealId=${associatedObjectId}`,
            label: "View",
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
