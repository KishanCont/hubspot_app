"use client";

import { getList } from "@/actions/retrieval";
import { MONGO_DB_NAME, MONGO_URI } from "@/constants";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getList(MONGO_URI, MONGO_DB_NAME)
      .then((res) => setCollection(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="max-w-5xl p-5 mx-auto">
      {collection.length > 0 ? (
        collection.map((collection, i) => (
          <div className="flex gap-5 " key={i}>
            <Link
              className="text-blue-400 underline"
              href={`/dashboard/edit/${generateSlug(collection.name)}`}
            >
              {collection.name}
            </Link>
          </div>
        ))
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default DashboardPage;
