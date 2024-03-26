"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import TableComponent from "@/components/TableComponent";
import { decodeSlug, getId } from "@/lib/utils";
import { useEffect } from "react";
import { getCollectionData } from "@/actions/retrieval";
import SimpleTable from "@/components/SimpleTable";
import { Container, Button } from "@mui/material";

const CollectionTable = ({ params }) => {
  const [data, setData] = useState({
    name: "",
    quantity: "",
    hs_product_id: getId(decodeSlug(params.collection)),
    recurringbillingfrequency: "",
    hs_recurring_billing_period: "",
    hs_discount_percentage: "",
  });

  const [collectionData, setCollectionData] = useState([]);

  const { portalId, collection } = params;
  const handleClick = async () => {
    const response = await axios.post("/api/crm-card/create", {
      portalId,
      dealId,
      ...data,
    });
  };

  useEffect(() => {
    getCollectionData(`Account_${portalId}`, collection).then((data) => {
      setCollectionData(data);
    });
  }, []);

  return (
    <Container>
      <SimpleTable collectionData={collectionData} data={data} />
      <Container className="flex gap-5 p-5 flex-col ">
        <div className="flex items-center justify-start gap-5">
          <input
            type="number"
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
            type="number"
            placeholder="hs_recurring_billing_period"
            onChange={(e) =>
              setData({ ...data, hs_recurring_billing_period: e.target.value })
            }
            value={data.hs_recurring_billing_period}
            className="p-2 border rounded-xl"
          />
        </div>

        <div>
          <Button onClick={handleClick} variant="outlined">
            Create
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default CollectionTable;
