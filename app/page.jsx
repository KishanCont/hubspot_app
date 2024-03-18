"use client";
import { getList } from "@/actions/retrieval";
import { MONGO_DB_NAME, MONGO_URI } from "@/constants";
import { generateSlug } from "@/lib/utils";
import { useTableContext } from "@/providers/TableContext";
import { Box, Button, Container, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { tableName, setTableName } = useTableContext();
  const router = useRouter();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getList(
      "mongodb+srv://Sooraj:jee1JatiFManli3B@sooraj.dgkx1a8.mongodb.net",
      "MyMongoDB_Database"
    )
      .then((res) => JSON.parse(res))
      .then((data) => console.log(data));
  }, []);

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
      {collection.map((collection) => (
        <h1 key={collection}>{collection}</h1>
      ))}
    </Container>
  );
};

export default page;
