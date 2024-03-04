import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null, 
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      try {
        const user = JSON.parse(userString);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle error gracefully, e.g., clear localStorage or display a message
      }
    }
  }, []);

  console.log("AuthContext state: ", state?.user?.token);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
