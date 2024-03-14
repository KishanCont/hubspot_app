import { CRMCardData } from "@/constants";
import { getRecords } from "@/lib/utils";

export const GET = async (req, res) => {
  try {
    const associatedObjectId =
      req.nextUrl.searchParams.get("associatedObjectId");

    const record = await getRecords(associatedObjectId);

    return Response.json(CRMCardData);
    // return res.status(200).json({ record });
  } catch (error) {
    console.log(error.message);
    return Response.json({
      results: [
        {
          objectId: 200,
          title: "API-22: APIs working too fast",
          link: "http://example.com/1",
          created: "22 Feb 2024",
          priority: "HIGH",
          project: "API",
          reported_by: "msmith@hubspot.com",
          description:
            "Customer reported that the APIs are just running too fast. This is causing a problem in that they're so happy.",
          reporter_type: "Account Manager",
          status: "In Progress",
          ticket_type: "Bug",
          properties: [
            {
              label: "Resolved by",
              dataType: "EMAIL",
              value: "ijones@hubspot.com",
            },
          ],
        },
      ],
    });
  }
};

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
