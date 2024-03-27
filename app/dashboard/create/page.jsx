"use client";

import { getCollectionList } from "@/actions/retrieval";
import { decodeSlug, removeId } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const CreatePage = ({ searchParams }) => {
  const [collections, setCollections] = useState([]);

  const portalId = searchParams.portalId;
  const dbName = `Account_${portalId}`;
  useEffect(() => {
    if (portalId) {
      getCollectionList(dbName)
        .then((res) => setCollections(res))
        .catch((error) => console.log(error));
    }
  }, []);
  if (collections.length === 0)
    return (
      <div className="max-w-5xl p-5 mx-auto">
        <p>No Collections</p>
      </div>
    );
  return (
    <div className="max-w-5xl p-5 mx-auto">
      {collections.length > 0 ? (
        collections.map((collection, i) => (
          <div className="flex gap-5 " key={i}>
            <Link
              className="text-blue-400 underline"
              href={`/dashboard/create/${searchParams.portalId}/${collection.name}?dealId=${searchParams.dealId}`}
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

export default CreatePage;
