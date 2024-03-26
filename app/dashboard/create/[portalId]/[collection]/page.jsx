"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import TableComponent from "@/components/TableComponent";
import { decodeSlug, getId } from "@/lib/utils";

const CollectionTable = ({ params }) => {
  const [data, setData] = useState({
    name: "",
    quantity: "",
    hs_product_id: getId(decodeSlug(params.collection)),
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
    <>
      <TableComponent
        portalId={params.portalId}
        collection={params.collection}
      />
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
          placeholder="quantity"
          onChange={(e) => setData({ ...data, quantity: e.target.value })}
          value={data.quantity}
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
    </>
  );
};

export default CollectionTable;
