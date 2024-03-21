"use client";
import { AUTHORIZATION_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(AUTHORIZATION_URL);
  }, []);
};

export default page;
