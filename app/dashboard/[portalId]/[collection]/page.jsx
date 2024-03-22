import TableComponent from "@/components/TableComponent";
import React from "react";

const Table = ({ params }) => {
  return (
    <div>
      <TableComponent
        portalId={params.portalId}
        collection={params.collection}
      />
    </div>
  );
};

export default Table;
