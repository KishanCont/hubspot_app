export const GET = (req, res) => {
  const portalId = req.nextUrl.searchParams.get("portalId");
  return Response.json({ portalId });
};
