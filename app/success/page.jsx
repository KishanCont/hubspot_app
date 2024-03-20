"use client";

import { runFireworks } from "@/lib/utils";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const params = useSearchParams();

  useEffect(() => {
    runFireworks();
    sessionStorage.setItem("portalId", params.get("portalId"));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 m-auto max-w-7xl">
      <h1 className="text-3xl font-semibold text-orange-500 ">
        App Installed Successfully
      </h1>
      <Button variant="outlined">
        <Link
          href={`https://app.hubspot.com/discover/${params.get(
            "portalId"
          )}/library/dashboards`}
        >
          Go Back to Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
