"use client";

import { getCollectionList } from "@/actions/retrieval";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = ({ searchParams }) => {
  const [collection, setCollection] = useState([]);

  const portalId = searchParams.portalId;
  useEffect(() => {
    if (portalId) {
      getCollectionList(`Account_${portalId}`)
        .then((res) => setCollection(res))
        .catch((error) => console.log(error));
    }
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
