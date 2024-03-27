"use client";

import React from "react";
import { Container, Button } from "@mui/material";
import axios from "axios";

const EditPage = ({ searchParams }) => {
  const { lineItemId, hsProductId, portalId } = searchParams;
  const [data, setData] = useState({
    name: "",
    quantity: "",
    hs_product_id: hsProductId,
    recurringbillingfrequency: "",
    hs_recurring_billing_period: "",
    hs_discount_percentage: "",
  });

  const onSubmit = async () => {
    const response = await axios.patch(`/api/crm-card/edit`, {
      lineItemId,
      portalId,
      ...data,
    });
  };
  return (
    <Container>
      <div className="flex items-center justify-start gap-5">
        <input
          type="name"
          placeholder="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          value={data.name}
          className="p-2 border rounded-xl"
        />
        <input
          type="number"
          placeholder="quantity"
          onChange={(e) => setData({ ...data, quantity: e.target.value })}
          value={data.quantity}
          className="p-2 border rounded-xl"
        />

        <select
          onChange={(e) =>
            setData({ ...data, recurringbillingfrequency: e.target.value })
          }
          value={data.recurringbillingfrequency}
          className="p-2 bg-white rounded-xl border w-40"
          placeholder="Billing Frequency"
        >
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
          <option value="bi-annually">Bi-Annually</option>
        </select>
        <input
          type="text"
          placeholder="Term"
          onChange={(e) =>
            setData({ ...data, hs_recurring_billing_period: e.target.value })
          }
          value={data.hs_recurring_billing_period}
          className="p-2 border rounded-xl"
        />
        <input
          type="number"
          placeholder="discount percentage"
          onChange={(e) =>
            setData({ ...data, hs_discount_percentage: e.target.value })
          }
          value={data.hs_discount_percentage}
          className="p-2 border rounded-xl"
        />
      </div>
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
};

export default EditPage;
