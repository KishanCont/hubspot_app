import { getRecords } from "@/actions/helperFunction";
import { CRMCardData } from "@/constants";

export const GET = async (req, res) => {
  try {
    const associatedObjectId =
      req.nextUrl.searchParams.get("associatedObjectId");
    const portalId = req.nextUrl.searchParams.get("portalId");

    if (!associatedObjectId) {
      return Response.json({
        message: "No associatedObjectId provided",
      });
    }

    const record = await getRecords(
      Number(associatedObjectId),
      Number(portalId)
    );
    if (!record) {
      return Response.json({
        message: "No record found",
      });
    }

    return Response.json(CRMCardData);
  } catch (error) {
    console.log(error.message);
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
