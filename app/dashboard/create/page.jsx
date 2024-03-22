"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";

const Create = ({ searchParams }) => {
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: "",
    hs_product_id: "",
    recurringbillingfrequency: "",
    hs_recurring_billing_period: "",
    hs_discount_percentage: "",
  });
  const handleClick = async () => {
    const { portalId, dealId } = searchParams;
    const response = await axios.post("/api/crm-card/create", {
      portalId,
      dealId,
      ...data,
    });
  };

  return (
    <div className="flex flex-col max-w-5xl gap-5 p-5 m-auto">
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        value={data.name}
        className="p-2 border rounded-xl"
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setData({ ...data, price: e.target.value })}
        value={data.price}
        className="p-2 border rounded-xl"
      />
      <input
        type="text"
        placeholder="quantity"
        onChange={(e) => setData({ ...data, quantity: e.target.value })}
        value={data.quantity}
        className="p-2 border rounded-xl"
      />
      <input
        type="text"
        placeholder="hs_product_id"
        onChange={(e) => setData({ ...data, hs_product_id: e.target.value })}
        value={data.hs_product_id}
        className="p-2 border rounded-xl"
      />
      <input
        type="text"
        placeholder="recurringbillingfrequency"
        onChange={(e) =>
          setData({ ...data, recurringbillingfrequency: e.target.value })
        }
        value={data.recurringbillingfrequency}
        className="p-2 border rounded-xl"
      />
      <input
        type="text"
        placeholder="hs_recurring_billing_period"
        onChange={(e) =>
          setData({ ...data, hs_recurring_billing_period: e.target.value })
        }
        value={data.hs_recurring_billing_period}
        className="p-2 border rounded-xl"
      />
      <input
        type="text"
        placeholder="hs_discount_percentage"
        onChange={(e) =>
          setData({ ...data, hs_discount_percentage: e.target.value })
        }
        value={data.hs_discount_percentage}
        className="p-2 border rounded-xl"
      />
      <button onClick={handleClick}>Create</button>
    </div>
  );
};

export default Create;
