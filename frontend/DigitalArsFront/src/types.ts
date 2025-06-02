export interface Transaction {
  ID_TRANSACCION: number;
  ID_CUENTA_ORIGEN: number;
  ID_CUENTA_DESTINO: number;
  MONTO: number;
  FECHA: Date;
}

export interface Session {
  id: number;
  nombre: string;
  email: string;
}