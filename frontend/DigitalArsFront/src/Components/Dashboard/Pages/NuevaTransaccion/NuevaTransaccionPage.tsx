import { PageContainer, type Breadcrumb } from '@toolpad/core';
import ConsultaAlias from './ConsultaAlias';

function NuevaTransaccionPage() {
  const breadcrumbs: Breadcrumb[] = [
    {title: "Inicio", path: "/dashboard"},
    {title: "Nueva Transaccion", path: "/dashboard/nueva_transaccion"}
  ]

  return (
    <PageContainer title='Nueva Transacción' breadcrumbs={breadcrumbs}>
      <ConsultaAlias></ConsultaAlias>
    </PageContainer>
  );
}

export default NuevaTransaccionPage;
