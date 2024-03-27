"use client";

import { getAccessToken } from "@/actions/authToken";
import { getItemList, getItemRecord } from "@/actions/helperFunction";
import { getCollectionData } from "@/actions/retrieval";
import { Button, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const EditPage = ({ searchParams }) => {
  const { lineItemId, hsProductId, portalId, name, dealId } = searchParams;
  const [inputs, setInputs] = useState({
    name: "",
    quantity: "",
    hs_product_id: hsProductId,
    recurringbillingfrequency: "",
    hs_recurring_billing_period: "",
    hs_discount_percentage: "",
  });

  const getListItems = async () => {
    try {
      const accessToken = await getAccessToken(Number(portalId));
      const list = await getItemList(accessToken, dealId);
      const data = await getItemRecord(list, accessToken);
      const response = data.filter((item) => item.id == lineItemId)[0]
        .properties;
      console.log(response);
      setInputs({
        ...inputs,
        name: response.name,
        quantity: response.quantity,
        hs_recurring_billing_period: response.hs_recurring_billing_period,
        hs_discount_percentage: response.hs_discount_percentage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListItems();
  }, []);

  const onSubmit = async () => {
    try {
      const response = await axios.patch("/api/crm-card/edit", {
        lineItem: lineItemId,
        portalId,
        ...inputs,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <div className="flex items-center justify-start gap-5">
        <input
          type="name"
          placeholder="name"
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          value={inputs.name}
          className="p-2 border rounded-xl"
        />
        <input
          type="number"
          placeholder="quantity"
          onChange={(e) => setInputs({ ...inputs, quantity: e.target.value })}
          value={inputs.quantity}
          className="p-2 border rounded-xl"
        />

        <select
          onChange={(e) =>
            setInputs({ ...inputs, recurringbillingfrequency: e.target.value })
          }
          value={inputs.recurringbillingfrequency}
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
            setInputs({
              ...inputs,
              hs_recurring_billing_period: e.target.value,
            })
          }
          value={inputs.hs_recurring_billing_period}
          className="p-2 border rounded-xl"
        />
        <input
          type="number"
          placeholder="discount percentage"
          onChange={(e) =>
            setInputs({ ...inputs, hs_discount_percentage: e.target.value })
          }
          value={inputs.hs_discount_percentage}
          className="p-2 border rounded-xl"
        />
      </div>
      <Button onClick={() => onSubmit()}>Submit</Button>
    </Container>
  );
};

export default EditPage;
