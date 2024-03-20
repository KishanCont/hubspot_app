"use client";

import { AUTHORIZATION_URL } from "@/constants";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    redirect(AUTHORIZATION_URL);
  }, []);
  return <div></div>;
};

export default HomePage;
