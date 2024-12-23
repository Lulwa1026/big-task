import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      const newState = {
        ...state,
        users: [...state.users, action.payload],
      };
      // Save to AsyncStorage whenever state changes
      AsyncStorage.setItem("users", JSON.stringify(newState.users));
      return newState;

    case "LOAD_USERS":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: [],
  });

  // Load users from AsyncStorage when app starts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem("users");
        if (savedUsers) {
          dispatch({ type: "LOAD_USERS", payload: JSON.parse(savedUsers) });
        }
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
