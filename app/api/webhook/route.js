import { saveTestData } from "@/actions/database";

// export const GET = async (req, res) => {
//   console.log(hubspotClient);
//   try {
//     const apiResponse = await hubspotClient.crm.products.getAll(
//       appId,
//       (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       }
//     );
//     console.log(JSON.stringify(apiResponse, null, 2));

//     return Response.json(apiResponse);
//   } catch (e) {
//     e.message === "HTTP request failed"
//       ? console.error(JSON.stringify(e.response, null, 2))
//       : console.error(e);
//     return Response.json({ success: e.message });
//   }
// };

export const POST = async (req, res) => {
  try {
    const data = await req.json();

    if (data) {
      await saveTestData(data);
    } else {
      await saveTestData({ testProduct: "Test Product" });
    }

    return Response.json({ success: "Data saved to MongoDB" });
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
    return Response.json({ error: e.message });
  }
};
