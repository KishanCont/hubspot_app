"use client";
import { generateSlug } from "@/lib/utils";
import { Box, Button, Container, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [tableName, setTableName] = useState("");
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
            if (tableName.length > 0) {
              localStorage.setItem("tableName", JSON.stringify(tableName));
            }
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
