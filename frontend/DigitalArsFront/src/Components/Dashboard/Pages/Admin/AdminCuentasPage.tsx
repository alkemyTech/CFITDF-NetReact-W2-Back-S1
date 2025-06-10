import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Cuenta } from '@/types';
import axios, { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { PageContainer, useDialogs, useNotifications } from '@toolpad/core';

export default function AdminCuentasPage() {
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const [searchParams] = useSearchParams();
  const [idUsuario, setIdUsuario] = useState(searchParams.get("ID_USUARIO"));
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [isLoadingError, setIsLoadingUsersError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const shouldCreate = useMemo(() => searchParams.get("create") === "true", [searchParams]);

  // BASE de la API: funciona local y en Docker
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const columns = useMemo<MRT_ColumnDef<Cuenta>[]>(() => [
    {
      accessorKey: 'ID_CUENTA',
      header: 'ID Cuenta',
      maxSize: 10,
      enableSorting: false,
      enableColumnActions: false,
      muiEditTextFieldProps: {
        required: false,
        hidden: true,
        sx: { display: "none" },
      },
    },
    {
      accessorKey: 'ID_USUARIO',
      header: 'ID Usuario',
      enableSorting: false,
      enableColumnActions: false,
      maxSize: 10,
      filterFn: (row, _field, value) =>
        row.original.ID_USUARIO.toString() === value,
      muiEditTextFieldProps: {
        type: "number",
        required: true,
        value: idUsuario,
        onChange: (e) => setIdUsuario(e.target.value),
      },
    },
    {
      accessorKey: "ALIAS",
      header: "Alias",
      muiEditTextFieldProps: {
        required: true,
      }
    },
    {
      accessorKey: "CBU",
      header: "CBU",
      muiEditTextFieldProps: {
        required: true,
      }
    },
    {
      accessorKey: 'SALDO',
      header: 'Saldo',
      Cell: ({ row }) =>
        typeof row.original.SALDO === "number"
          ? row.original.SALDO.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
          : "-",
      muiEditTextFieldProps: {
        type: "number",
        required: true
      },
    },
  ], [idUsuario]);

  //CREATE action
  const handleCreateCuenta: MRT_TableOptions<Cuenta>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const { ALIAS, CBU, SALDO } = values;
    setIsMutating(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE}/api/cuenta`, {
        ID_USUARIO: idUsuario,
        ALIAS,
        CBU,
        SALDO
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      table.setCreatingRow(null); //exit creating mode
      fetchCuentas();
    } finally {
      setIsMutating(false);
    }
  };

  //UPDATE action
  const handleUpdateCuenta: MRT_TableOptions<Cuenta>['onEditingRowSave'] = async ({
    values,
    row,
    table,
  }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE}/api/cuenta/${row.original.ID_CUENTA}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      notifications.show("Cuenta actualizada correctamente!", {
        severity: "success",
        autoHideDuration: 5000
      });
      table.setEditingRow(null); //exit editing mode
    } catch (e: any) {
      if (e instanceof AxiosError && e.status === 401) return;
      notifications.show("Hubo un error interno al intentar actualizar la cuenta");
    }
  };

  //DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<Cuenta>) => {
    const deleteConfirmed = await dialogs.confirm(
      `¿Esta seguro que desea eliminar la cuenta (id cuenta: ${row.original.ID_CUENTA})?`, {
      severity: "warning",
      title: "Confirmar",
      okText: <Button variant='contained' color='error'>Eliminar</Button>,
      cancelText: "Cancelar",
    });
    if (deleteConfirmed) {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/cuenta/${row.original.ID_CUENTA}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCuentas();
    }
  };

  async function fetchCuentas() {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/cuenta`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCuentas(res.data);
      console.log("Cuentas recibidas del backend:", res.data);
    } catch (e) {
      setIsLoadingUsersError(true);
      console.error("Error fetching cuentas:", e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCuentas();
  }, []);

  useEffect(() => {
    if (shouldCreate) {
      table.setCreatingRow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCreate]);

  const table = useMaterialReactTable({
    localization: MRT_Localization_ES,
    columns,
    data: cuentas,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row?.ID_CUENTA?.toString(),
    muiToolbarAlertBannerProps: isLoadingError
      ? {
        color: 'error',
        children: 'Error al cargar los datos',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowSave: handleCreateCuenta,
    onEditingRowSave: handleUpdateCuenta,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Crear Cuenta</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Editar Cuenta</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Nueva cuenta
      </Button>
    ),
    state: {
      isLoading: isLoading,
      isSaving: isMutating,
      showAlertBanner: isLoadingError,
    },
  });

  return (
    <PageContainer>
      <MaterialReactTable table={table} />
    </PageContainer>
  );
}
