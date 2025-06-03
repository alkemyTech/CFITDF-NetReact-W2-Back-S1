import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface Usuario {
    ID_USUARIO: number;
    NOMBRE: string;
    EMAIL: string;
    ID_ROL: number;
}

interface UserContextType {
    saldo: number | null;
    recargarSaldo: () => void;
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario | null) => void;
}

// 🟢 Incluye todos los valores del contexto, no solo saldo
const UserContext = createContext<UserContextType>({
    saldo: null,
    recargarSaldo: () => { },
    usuario: null,
    setUsuario: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [saldo, setSaldo] = useState<number | null>(null);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const recargarSaldo = async () => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!user || !token) return;

        try {
            const userObj = JSON.parse(user);
            setUsuario(userObj); // ✅ seteamos el usuario al contexto

            const response = await axios.get(
                `http://localhost:5056/api/cuenta/usuario/${userObj.ID_USUARIO}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Respuesta del backend:", response.data);
            setSaldo(response.data.SALDO);
        } catch (error) {
            console.error("Error al obtener el saldo:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
            console.warn("Token o usuario no disponible");
            return;
        }

        recargarSaldo();
    }, []);

    return (
        <UserContext.Provider value={{ saldo, recargarSaldo, usuario, setUsuario }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
