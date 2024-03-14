"use client";

import { useTableContext } from "@/providers/TableContext";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TableDefinitionForm = ({ slug }) => {
  const { tableName, inputFields, setInputFields } = useTableContext();
  const router = useRouter();

  const removeRow = (index) => {
    if (inputFields.length === 1) {
      alert("At least one field is required.");
      return;
    }
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  const addRow = () => {
    if (inputFields.length >= 10) {
      alert("You have reached the maximum number of fields (10).");
      return;
    }
    setInputFields([
      ...inputFields,
      { columnHeader: "", headerType: "", dataType: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isBlank = inputFields.some(
      (field) => !field.columnHeader || !field.headerType || !field.dataType
    );

    if (isBlank) {
      alert("All fields are required.");
      return;
    }

    const outputCount = inputFields.filter(
      (field) => field.headerType === "output"
    ).length;

    if (outputCount === 0 || outputCount > 3) {
      alert("At least one output field is required and cannot exceed 3.");
      return;
    }

    router.push(`/${slug}/table`);
  };

  useEffect(() => {
    const inputCount = inputFields.filter(
      (field) => field.headerType === "input"
    ).length;
    const outputCount = inputFields.filter(
      (field) => field.headerType === "output"
    ).length;

    if (inputCount > 7 || outputCount > 3) {
      alert("You can only have 7 input fields and 3 output fields.");
    }
  }, [inputFields, setInputFields]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Typography variant="h5">
        Create Columns for{" "}
        <span className="font-bold text-blue-600">{tableName}</span> table
      </Typography>
      <form className="flex flex-col gap-5">
        {inputFields.map((item, index) => (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={5}
            key={index}
          >
            <TextField
              size={"small"}
              fullWidth
              label="Table Name"
              value={item.columnHeader}
              onChange={(e) => {
                setInputFields(
                  inputFields.map((field, i) =>
                    i === index
                      ? { ...field, columnHeader: e.target.value }
                      : field
                  )
                );
              }}
            />

            <FormControl size="small" fullWidth>
              <InputLabel id="select-header-type">Header Type</InputLabel>
              <Select
                labelId="select-header-type"
                label="Header Type"
                value={item.headerType}
                onChange={(e) => {
                  setInputFields(
                    inputFields.map((field, i) =>
                      i === index
                        ? { ...field, headerType: e.target.value }
                        : field
                    )
                  );
                }}
              >
                <MenuItem value={"input"}>Input</MenuItem>
                <MenuItem value={"output"}>Output</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="select-data-type">Data Type</InputLabel>
              <Select
                labelId="select-data-type"
                label="Data Type"
                onChange={(e) => {
                  setInputFields(
                    inputFields.map((field, i) =>
                      i === index
                        ? { ...field, dataType: e.target.value }
                        : field
                    )
                  );
                }}
                value={item.dataType}
              >
                <MenuItem value="text">Text</MenuItem>

                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="boolean">Boolean</MenuItem>
                {item.headerType === "input" && (
                  <MenuItem value="number">Number</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeRow(index)}
              disabled={inputFields.length === 1}
            >
              <DeleteIcon />
            </Button>
          </Box>
        ))}
      </form>
      <Box display={"flex"} gap={2}>
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" onClick={addRow}>
          Add Fields
        </Button>
      </Box>
    </Box>
  );
};

export default TableDefinitionForm;
