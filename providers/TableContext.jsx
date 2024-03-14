"use client";

import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export const TableContextProvider = ({ children }) => {
  const initialRows = [];
  const [columnsName, setColumnsName] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [tableName, setTableName] = useState("");
  const [inputFields, setInputFields] = useState([
    { columnHeader: "", headerType: "", dataType: "" },
  ]);
  return (
    <TableContext.Provider
      value={{
        columnsName,
        setColumnsName,
        rows,
        setRows,
        rowModesModel,
        setRowModesModel,
        tableName,
        setTableName,
        inputFields,
        setInputFields,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
