"use client";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Container } from "@mui/material";

import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import saveCollection from "@/actions";
import { generateSlug } from "@/lib/utils";
import { useTableContext } from "@/providers/TableContext";
import { randomId } from "@mui/x-data-grid-generator";
import { useRouter } from "next/navigation";

const TableComponent = () => {
  const {
    tableName,
    inputFields,
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
  } = useTableContext();

  const router = useRouter();

  const inputChildren = inputFields
    .filter((item) => item.headerType === "input")
    .map((item) => {
      return {
        field: generateSlug(item.columnHeader),
        headerName: item.columnHeader,
        editable: true,
        type: item.dataType,
      };
    });

  const outputChildren = inputFields
    .filter((item) => item.headerType === "output")
    .map((item) => {
      return {
        field: generateSlug(item.columnHeader),
        headerName: item.columnHeader,
        editable: true,
        type: item.dataType,
      };
    });

  const columnGroupingModel = [
    {
      groupId: "Input",
      children: inputChildren,
    },
    {
      groupId: "Output",
      children: outputChildren,
    },
  ];

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "Id" },
    ...inputChildren,
    ...outputChildren,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      let newRow = {};

      columns.map((item) => {
        if (item.field === "id") {
          newRow[item.field] = id;
        } else {
          newRow[item.field] = "";
        }
      });

      setRows((oldRows) => [...oldRows, { ...newRow, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Container>
      <Box
        p={5}
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <h1>{tableName}</h1>
        <DataGrid
          experimentalFeatures={{ columnGrouping: true }}
          rows={rows}
          columnGroupingModel={columnGroupingModel}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />

        <Button
          onClick={async () => {
            console.log(rows);
            console.log(columnsName);
            await saveCollection(tableName, [
              {
                tableName: tableName,
                columnsName: columnsName,
                rows: rows,
              },
            ]);
            router.push("/dashboard");
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default TableComponent;
