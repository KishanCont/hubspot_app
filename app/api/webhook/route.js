import { createMongoConnection } from "@/actions/dbConnetion";
import { createProductCollection, dropCollection } from "@/actions/webhook";

export const POST = async (req, res) => {
  try {
    const data = await req.json();
    const { objectId, portalId, subscriptionType } = data[0];
    const dbName = `Account_${data[0].portalId}`;
    const db = dbClient.db(dbName);

    if (subscriptionType === "product.creation") {
      await createProductCollection(db, objectId, portalId);
      return Response.json({ success: "Data saved to MongoDB" });
    } else if (subscriptionType === "product.deletion") {
      await dropCollection(db, objectId, portalId);
      return Response.json({ success: "Data saved to MongoDB" });
    }

    dbClient.close();
    return Response.json({ success: "Data saved to MongoDB" });
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
    return Response.json({ error: e.message });
  }
};
