import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

// Tipos de datos
export interface Usuario {
    ID_USUARIO: number;
    NOMBRE: string;
    EMAIL: string;
    ID_ROL: number;
    NOMBRE_ROL: string;
}

export interface Cuenta {
    ID_CUENTA: number;
    ID_USUARIO: number;
    SALDO: number;
    ALIAS: string;
    CBU: string;
}

interface UserContextType {
    saldo: number | null;
    recargarSaldo: () => void;
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario | null) => void;
    cuenta: Cuenta | null;
    cargarDatosCuenta: () => void;
}

// Contexto inicial con null seguro
const UserContext = createContext<UserContextType | null>(null);

// Hook personalizado
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext debe usarse dentro de un <UserProvider>");
    }
    return context;
};

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [saldo, setSaldo] = useState<number | null>(null);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cuenta, setCuenta] = useState<Cuenta | null>(null);

    const recargarSaldo = async () => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!user || !token) return;

        try {
            const userObj = JSON.parse(user);
            setUsuario(userObj);

            const response = await axios.get(
                `http://localhost:5000/api/cuenta/usuario/${userObj.ID_USUARIO}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSaldo(response.data.SALDO);
            setCuenta(response.data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    const cargarDatosCuenta = async () => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!user || !token) return;

        try {
            const userObj = JSON.parse(user);
            const response = await axios.get(
                `http://localhost:5000/api/cuenta/usuario/${userObj.ID_USUARIO}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCuenta(response.data);
        } catch (error) {
            console.error("Error al obtener datos de cuenta:", error);
        }
    };

    useEffect(() => {
        recargarSaldo();
        cargarDatosCuenta();
    }, []);

    return (
        <UserContext.Provider
            value={{ saldo, recargarSaldo, usuario, setUsuario, cuenta, cargarDatosCuenta }}
        >
            {children}
        </UserContext.Provider>
    );
};
