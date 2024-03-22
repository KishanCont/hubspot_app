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
      const response = await createProductCollection(
        db,
        objectId,
        Number(portalId)
      );
      if (!response) {
        return Response.json({ message: "Not Created" });
      }
    } else if (subscriptionType === "product.deletion") {
      const response = await dropCollection(db, objectId, Number(portalId));
      if (!response) {
        return Response.json({ message: "Not Deleted" });
      }
    }

    dbClient.close();
    return Response.json({ message: "success" });
  } catch (e) {
    return Response.json({ message: e.message });
  }
};
