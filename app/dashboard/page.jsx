"use client";

import { getCollectionList } from "@/actions/retrieval";
import { decodeSlug, generateSlug, removeId } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = ({ searchParams }) => {
  const [collection, setCollection] = useState([]);

  const portalId = searchParams.portalId;
  const dbName = `Account_${portalId}`;
  useEffect(() => {
    if (portalId) {
      getCollectionList(dbName)
        .then((res) => setCollection(res))
        .catch((error) => console.log(error));
    }
  }, []);
  if (collection.length === 0)
    return (
      <div className="max-w-5xl p-5 mx-auto">
        <p>No Collections</p>
      </div>
    );
  return (
    <div className="max-w-5xl p-5 mx-auto">
      {collection.length > 0 ? (
        collection.map((collection, i) => (
          <div className="flex gap-5 " key={i}>
            <Link
              className="text-blue-400 underline"
              href={`/dashboard/${portalId}/${generateSlug(collection.name)}`}
            >
              {removeId(decodeSlug(collection.name))}
            </Link>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default DashboardPage;
