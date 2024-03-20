"use client";

import { runFireworks } from "@/lib/utils";
import React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";

const SuccessPage = ({ params }) => {
  console.log(params);
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 m-auto max-w-7xl">
      <h1 className="text-3xl font-semibold text-orange-500 ">
        App Installed Successfully
      </h1>
      <Button variant="outlined">
        <Link href="/dashboard">Go Back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
