import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogout = () => {
 const { dispatch } = useAuthContext();
 const [loading, setLoading] = useState(false); // Initialize loading state to false
 const navigate = useNavigate();

 const logout = async () => {
    setLoading(true); // Set loading to true when logout starts
    try {
      // Clear user data and token from local storage
      localStorage.removeItem('user');
      // Assuming 'token' is the key you're using to store the token
      localStorage.removeItem('token');

      // Dispatch logout action to update the authentication context
      dispatch({ type: 'LOGOUT' });

      // Navigate to the home page after a short delay to allow the logout process to complete
      setTimeout(() => {
        navigate('/');
        setLoading(false); // Set loading to false after navigation
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false); // Ensure loading state is reset in case of an error
    }
 };

 return { logout, loading }; // Return loading state along with logout function
};
