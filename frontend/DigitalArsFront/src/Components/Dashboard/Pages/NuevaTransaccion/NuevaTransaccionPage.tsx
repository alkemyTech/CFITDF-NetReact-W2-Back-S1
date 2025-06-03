import { PageContainer, useActivePage } from '@toolpad/core';
import ConsultaAlias from './ConsultaAlias';

function NuevaTransaccionPage() {
  const activePage = useActivePage()

  // Mas info sobre rutas dinamicas en el breadcumbs:
  // https://mui.com/toolpad/core/react-page-container/#dynamic-routes
  const title = "Nueva Transaccion"
  const path = "nueva_transaccion"

  return (
    <PageContainer title='Nueva Transacción' breadcrumbs={[...activePage!.breadcrumbs, {title, path}]}>
      <ConsultaAlias></ConsultaAlias>
    </PageContainer>
  );
}

export default NuevaTransaccionPage;
