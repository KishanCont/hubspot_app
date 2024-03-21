import { createMongoConnection } from "@/actions/dbConnetion";
import { createProductCollection, dropCollection } from "@/actions/webhook";

export const POST = async (req, res) => {
  try {
    const dbClient = await createMongoConnection();
    const data = await req.json();
    const { objectId, portalId, subscriptionType } = data[0];
    const dbName = `Account_${portalId}`;
    const db = dbClient.db(dbName);

    if (subscriptionType === "product.creation") {
      await createProductCollection(db, objectId, Number(portalId));
    } else if (subscriptionType === "product.deletion") {
      await dropCollection(db, objectId, Number(portalId));
    }

    dbClient.close();
    return Response.json({ data });
  } catch (e) {
    return Response.json({ message: e.message });
  }
};
