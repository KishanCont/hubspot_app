"use client";

import { getCollection } from "@/actions/retrieval";
import TableComponent from "@/components/TableComponent";
import { MONGO_DB_NAME, MONGO_URI } from "@/constants";
import { useEffect, useState } from "react";

const SeperatePage = ({ params }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCollection(MONGO_URI, MONGO_DB_NAME, params.table)
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
