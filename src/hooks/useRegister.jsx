import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [errorRegister, setError] = useState(null);
  const [loadingRegister, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const register = async (username, email, password, profile) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profile', profile); // Assuming 'profile' is a File object

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      setError("Registration successful");
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loadingRegister, errorRegister };
};
