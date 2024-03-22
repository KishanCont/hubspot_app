"use client";
import React from "react";
import axios from "axios";

const Create = ({ searchParams }) => {
  const handleClick = async () => {
    const { portalId, dealId } = searchParams;
    const response = await axios.post("/api/crm-card/create", {
      portalId,
      dealId,
    });
  };

  return <div>Create</div>;
};

export default Create;
