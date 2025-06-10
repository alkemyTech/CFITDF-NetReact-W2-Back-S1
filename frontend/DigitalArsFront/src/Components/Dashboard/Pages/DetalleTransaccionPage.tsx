import { Container, Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { useState } from "react";
import { useParams } from "react-router-dom";


interface Transaction {
  id: number;
  cuenta_origen: number;
  cuenta_destino: number;
}

export default function DetalleTransaccionPage() {
  const params = useParams();
  const id = Number(params.transactionId);
  const isIdValid = typeof id === "number" && !isNaN(id)
  const [transaction] = useState<Transaction | null>(null);

  if (!isIdValid || !transaction)
    return <Container
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography variant="h3" component="h3">Error</Typography>
        <Typography variant="body1">La transaccion que estas buscando no existe</Typography>
      </div>
    </Container>;
  
  return <PageContainer>Transaccion Id: {id}</PageContainer>;
}
