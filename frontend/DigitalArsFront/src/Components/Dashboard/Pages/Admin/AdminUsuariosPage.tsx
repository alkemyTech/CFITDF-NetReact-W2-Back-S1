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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddCardIcon from '@mui/icons-material/AddCard';
import type { User } from '@/types';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { PageContainer, useDialogs, useNotifications } from '@toolpad/core';

export default function AdminUsuariosPage() {
  const notifications = useNotifications();
  const dialogs = useDialogs();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsersError, setIsLoadingUsersError] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isMutatingUser, setIsMutatingUser] = useState(false)

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
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
        },
      },
      {
        accessorKey: 'NOMBRE',
        header: 'Nombre',
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: 'EMAIL',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true
        },
      },
      {
        accessorKey: "PASS",
        header: "Password",
        enableHiding: true,
        enableColumnFilter: false,
        enableSorting: false,
        muiEditTextFieldProps: {
          type: "password",
          required: true,
          defaultValue: "",
        }
      },
      {
        accessorKey: "ID_ROL",
        Cell: ({ row }) => {
          switch (row.original.ID_ROL) {
            case 1: return "Administrador"
            case 2: return "Usuario"
            default: return row.original.ID_ROL
          }
        },
        header: "Rol",
        editVariant: "select",
        editSelectOptions: [
          { value: 1, label: "Administrador" },
          { value: 2, label: "Usuario" }
        ],
        muiEditTextFieldProps: {
          select: true,
          required: true,
        }
      },
    ],
    [],
  );

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const { NOMBRE, EMAIL, PASS, ID_ROL } = values
    setIsMutatingUser(true)
    try {
      await axios.post("/api/user", {
        NOMBRE,
        EMAIL,
        PASS,
        ID_ROL
      })
      table.setCreatingRow(null); //exit creating mode
      fetchUsers();
    } finally {
      setIsMutatingUser(false)
    }
  };

  //UPDATE action
  const handleUpdateUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
    values,
    row,
    table,
  }) => {
    if (values.PASS === row.original.PASS) {
      // Omitir actualizacion de contraseña si se mantiene tal cual
      delete values.PASS;
    }
    console.log(values)
    try {
      await axios.put(`/api/user/${row.original.ID_USUARIO}`, values)
      notifications.show("Usuario actualizado", {
        severity: "success",
        autoHideDuration: 5000
      })
      table.setEditingRow(null); //exit editing mode
    } catch (e: any) {
      if (e instanceof AxiosError) {
        if (e.status === 401) return;
      }
      notifications.show("Hubo un error interno al intentar actualizar")
    }
  };

  //DELETE action
  const openDeleteConfirmModal = async (row: MRT_Row<User>) => {
    const deleteConfirmed = await dialogs.confirm(
      `¿Esta seguro que desea eliminar el usuario (${row.original.EMAIL})?`, {
      severity: "warning",
      title: "Confirmar",
      okText: <Button variant='contained' color='error'>Eliminar</Button>,
      cancelText: "Cancelar",
    })
    if (deleteConfirmed) {
      await axios.delete(`/api/user/${row.original.ID_USUARIO}`)
      fetchUsers();
    }
  };

  async function fetchUsers() {
    try {
      setIsLoadingUsers(true)
      const res = await axios.get<User[]>("/api/user");
      setUsers(res.data);
    } catch (e: any) {
      setIsLoadingUsersError(true)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  useEffect(() => {

    fetchUsers()
  }, [])

  const table = useMaterialReactTable({
    localization: MRT_Localization_ES,
    columns,
    initialState: {
      columnVisibility: {
        PASS: false,
      }
    },
    data: users,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row?.ID_USUARIO?.toString(),
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleUpdateUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Crear usuario</DialogTitle>
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
        <DialogTitle variant="h4">Editar Usuario</DialogTitle>
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
    renderRowActions: ({ row, table }) => row.original.FECHA_BAJA ? <></> : (
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
        <Tooltip title="Ver cuentas">
          {/* @ts-expect-error */ }
          <IconButton LinkComponent={ Link } to={ `/dashboard/admin/cuentas?ID_USUARIO=${row.original.ID_USUARIO}` } color="info" >
            <CreditCardIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Crear cuenta">
          {/* @ts-expect-error */ }
          <IconButton LinkComponent={ Link } to={ `/dashboard/admin/cuentas?ID_USUARIO=${row.original.ID_USUARIO}&create=true` } color="success">
            <AddCardIcon />
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
        Nuevo usuario
      </Button>
    ),
    muiTableBodyCellProps: ({row}) => ({
      sx: {
        color: row.original.FECHA_BAJA ? "red" : ""
      }
    }),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isMutatingUser,
      showAlertBanner: isLoadingUsersError,
    },
  });

  return <PageContainer>
    <MaterialReactTable table={ table } />
  </PageContainer>
};

