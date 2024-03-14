import { CRMCardData } from "@/constants";

export const GET = async (req, res) => {
  try {
    const { associatedObjectId } = req.query;

    const record = await getRecords(associatedObjectId);

    // await saveTestData(record);

    return Response.json({
      CRMCardData,
    });
    // return res.status(200).json({ record });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRecords = async (dealId, accessToken) => {
  const getLineItems = `https://api.hubapi.com/crm/v3/objects/line_items?associations.deals=${dealId}`;
  try {
    const response = await axios.post(getLineItems, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};
