import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  function login(usuario: Usuario, token: string) {
    setUsuario(usuario);
    setToken(token);

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuario)
    );

    localStorage.setItem("token", token);
  }

  function logout() {
    setUsuario(null);
    setToken(null);

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}