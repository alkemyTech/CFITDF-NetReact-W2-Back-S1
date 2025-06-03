import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface UserContextType {
    saldo: number | null;
    recargarSaldo: () => void;
}


const UserContext = createContext < UserContextType > ({
    saldo: null,
    recargarSaldo: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [saldo, setSaldo] = useState < number | null > (null);

    const recargarSaldo = async () => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!user || !token) return;

        try {
            const usuario = JSON.parse(user);
            const response = await axios.get(
                `http://localhost:5056/api/cuenta/usuario/${usuario.ID_USUARIO}`,
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
        <UserContext.Provider value={{ saldo, recargarSaldo }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
