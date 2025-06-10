import { PageContainer, type Breadcrumb } from '@toolpad/core';

import TransaccionModal from '../../TransaccionModal';

function NuevaTransaccionPage() {
  const breadcrumbs: Breadcrumb[] = [
    {title: "Inicio", path: "/dashboard"},
    {title: "Nueva Transaccion", path: "/dashboard/nueva_transaccion"}
  ]

  return (
    <PageContainer title='Nueva Transacción' breadcrumbs={breadcrumbs}>
      <TransaccionModal></TransaccionModal>
    </PageContainer>
  );
}

export default NuevaTransaccionPage;
