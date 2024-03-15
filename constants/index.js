export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const AUTHORIZATION_URL = process.env.AUTHORIZATION_URL;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const MONGO_URI = process.env.MONGO_URI;

export const PORT = process.env.PORT || 5000;
export const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
export const HUBSPOT_APP_ID = process.env.HUBSPOT_APP_ID;

export const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

export const CRMCardData = {
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
      actions: [
        {
          type: "IFRAME",
          width: 890,
          height: 748,
          uri: "https://hubspot-app-sapm.onrender.com/edit",
          label: "Edit",
        },
        {
          type: "IFRAME",
          width: 890,
          height: 748,
          uri: "https://hubspot-app-sapm.onrender.com/delete",
          label: "Delete",
        },
        {
          type: "IFRAME",
          width: 890,
          height: 748,
          uri: "https://hubspot-app-sapm.onrender.com/delete",
          label: "Create",
        },
      ],
    },
  ],
};
