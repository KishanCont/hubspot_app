import TableComponent from "@/components/TableComponent";
import React from "react";

const Table = ({ params }) => {
  return (
    <div>
      <TableComponent dbName={params.dbName} collection={params.collection} />
    </div>
  );
};

export default Table;
