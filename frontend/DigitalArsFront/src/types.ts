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

export interface User {
  ID_USUARIO: number;
  NOMBRE: string;
  EMAIL: string;
  CREATION_DATE: Date;
  PASS: string;
  ID_ROL: number;
}

export interface Cuenta {
  ID_CUENTA: number;
  ID_USUARIO: number;
  SALDO: number;
  ALIAS: string;
  CBU: string;
}
