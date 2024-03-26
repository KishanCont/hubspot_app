import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

const SimpleTable = ({ collectionData, data }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (collectionData.length > 0) {
      const newData = collectionData.filter(
        (item) =>
          item.quantity == data.quantity ||
          item.term == data.hs_recurring_billing_period
      );
      setRows(newData);
    }
  }, [data]);
  return (
    <div className="h-80">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Billing Start Date</TableCell>
            <TableCell align="right">Term</TableCell>
            <TableCell align="right">Billing Frequency</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                {row.billing_start_date.getMonth()}
              </TableCell>
              <TableCell align="right">{row.term}</TableCell>
              <TableCell align="right">{row.billing_frequency}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.discount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimpleTable;
