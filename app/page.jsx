"use client";
import { generateSlug } from "@/lib/utils";
import { useTableContext } from "@/providers/TableContext";
import { Box, Button, Container, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

const page = () => {
  const { tableName, setTableName } = useTableContext();
  const router = useRouter();

  return (
    <Container>
      <Box
        display={"flex"}
        justifyItems={"center"}
        gap={2}
        alignItems={"center"}
        p={4}
        margin={"auto"}
        maxWidth={"400px"}
      >
        <TextField
          size={"small"}
          label="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/${generateSlug(tableName)}`);
          }}
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default page;
