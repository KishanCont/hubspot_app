"use client";
import { getCollectionData } from "@/actions/retrieval";
import TableComponent from "@/components/TableComponent";

import { useEffect, useState } from "react";

const SeperatePage = ({ params }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const portalId = sessionStorage.getItem("portalId");
    getCollectionData(`Account_${portalId}`, params.table)
      .then((res) => setData(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {data &&
        data.map((item) => (
          <TableComponent
            key={item.tableName}
            data={item.rows}
            table={item.tableName}
            fields={item.columnsName}
          />
        ))}
    </div>
  );
};

export default SeperatePage;
