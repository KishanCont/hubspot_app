import TableDefinitionForm from "@/components/TableDefinitionForm";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";

const TableDefinition = ({ params: { slug } }) => {
  return (
    <Container>
      <Box px={5} mt={4} display={"flex"} flexDirection={"column"} gap={4}>
        <Box>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                textAlign={"center"}
                sx={{
                  textDecoration: "underline",
                }}
              >
                Here you can define your table columns.
              </Typography>
              <Box>
                <Typography variant="h6">Points to be remember: -</Typography>
                <ul className="px-4 list-disc ">
                  <li>
                    There is at least one output field but not more than 3
                  </li>
                  <li>Maximum input fields is 7</li>
                  <li>Total fields can't be more than 10</li>
                </ul>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <TableDefinitionForm slug={slug} />
        </Box>
      </Box>
    </Container>
  );
};

export default TableDefinition;
