import { createMongoConnection } from "@/actions/dbConnetion";
import { createProductCollection } from "@/actions/webhook";

export const POST = async (req, res) => {
  try {
    const data = await req.json();
    const { objectId, portalId } = data[0];
    const dbName = `Account_${data[0].portalId}`;
    const dbClient = await createMongoConnection();
    const db = dbClient.db(dbName);

    await createProductCollection(db, objectId, portalId);
    db;
    dbClient.close();
    return Response.json({ success: "Data saved to MongoDB" });
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
    return Response.json({ error: e.message });
  }
};
