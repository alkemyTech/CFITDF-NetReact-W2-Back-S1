import { useEffect, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
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

export default function AdminUsuariosPage() {
  const notifications = useNotifications();
  const dialogs = useDialogs();
  const [searchParams] = useSearchParams();

  const [idUsuario, setIdUsuario] = useState(searchParams.get("ID_USUARIO"));
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [isLoadingError, setIsLoadingUsersError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false)

  const shouldCreate = useMemo(() => searchParams.get("create") === "true", [searchParams]);

  const columns = useMemo<MRT_ColumnDef<Cuenta>[]>(
    () => [
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
        Cell: ({ row }) => row.original.SALDO
          .toLocaleString("es-AR", { style: "currency", currency: "ARS" }),
        muiEditTextFieldProps: {
          type: "number",
          required: true
        },
      },
    ],
    [],
  );

  //CREATE action
  const handleCreateCuenta: MRT_TableOptions<Cuenta>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    console.log("Values", values)
    const { ALIAS, CBU, SALDO } = values
    setIsMutating(true)
    try {
      await axios.post("/api/cuenta", {
        ID_USUARIO: idUsuario,
        ALIAS,
        CBU,
        SALDO
      })
      table.setCreatingRow(null); //exit creating mode
      fetchCuentas();
    } finally {
      setIsMutating(false)
    }
  };

  //UPDATE action
  const handleUpdateCuenta: MRT_TableOptions<Cuenta>['onEditingRowSave'] = async ({
    values,
    row,
    table,
  }) => {
    console.log(values)
    try {
      await axios.put(`/api/cuenta/${row.original.ID_USUARIO}`, values)
      notifications.show("Cuenta actualizada correctamente!", {
        severity: "success",
        autoHideDuration: 5000
      })
      table.setEditingRow(null); //exit editing mode
      notifications.show("Cuenta actualizada correctamente!", {
        severity: "success"
      })
    } catch (e: any) {
      if (e instanceof AxiosError) {
        if (e.status === 401) return;
      }
      notifications.show("Hubo un error interno al intentar actualizar la cuenta")
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
      await axios.delete(`/api/cuenta/${row.original.ID_CUENTA}`)
      fetchCuentas();
    }
  };

  async function fetchCuentas() {
    try {
      setIsLoading(true)
      const res = await axios.get<Cuenta[]>("/api/cuenta");
      setCuentas(res.data);
    } catch (e: any) {
      setIsLoadingUsersError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCuentas()
    if (searchParams.has("ID_USUARIO")) {
      table.setColumnFilters(() => [{ id: "ID_USUARIO", value: searchParams.get("ID_USUARIO") }]);
    }
  }, [])

  useEffect(() => {
    if (shouldCreate) {
      table.setCreatingRow(true)
    }
  }, [shouldCreate])

  const table = useMaterialReactTable({
    localization: MRT_Localization_ES,
    columns,
    data: cuentas,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row?.ID_USUARIO?.toString(),
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
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Crear Cuenta</DialogTitle>
        <DialogContent
          sx={ { display: 'flex', flexDirection: 'column', gap: '1rem' } }
        >
          { internalEditComponents } {/* or render custom edit components here */ }
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={ table } row={ row } />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Editar Cuenta</DialogTitle>
        <DialogContent
          sx={ { display: 'flex', flexDirection: 'column', gap: '1.5rem' } }
        >
          { internalEditComponents } {/* or render custom edit components here */ }
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={ table } row={ row } />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={ { display: 'flex', gap: '1rem' } }>
        <Tooltip title="Editar">
          <IconButton onClick={ () => table.setEditingRow(row) }>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={ () => openDeleteConfirmModal(row) }>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={ () => {
          table.setCreatingRow(true);
        } }
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

  return <PageContainer>
    <MaterialReactTable table={ table } />
  </PageContainer>
};

