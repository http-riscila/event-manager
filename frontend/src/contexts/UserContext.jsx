import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("api/login", { email, password });

      if (response.status === 200) {
        const userData = response.data;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true, data: userData };
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Credenciais inválidas",
      };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
