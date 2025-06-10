  import BoxPlazoFijo from "@/Components/CrearPlazoFIjo/BoxPlazoFIjo";
  import { Box } from "@mui/material";
  import { PageContainer } from "@toolpad/core";

  export default function AhorrosPage() {
    return (
      <PageContainer>
        <Box mt={4}>
          <BoxPlazoFijo />
        </Box>
      </PageContainer>
    );
  }