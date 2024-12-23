import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { name: "test", email: "test@test.com", password: "123" },
    { name: "user", email: "user@example.com", password: "123" },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  const register = (userData) => {
    console.log("Registering user:", userData);
    setUsers([...users, userData]);
  };

  const login = (user) => {
    console.log("Logging in user:", user);
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ users, currentUser, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
