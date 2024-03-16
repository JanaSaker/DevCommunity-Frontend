import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signIn = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();

        // Debugging: Log the entire response to inspect its structure
        console.log(json);

        if (!response.ok) {
          setLoading(false);
          setError(json.message);
        } else {
          setLoading(false);
          // Correctly accessing the user data under the 'data' property
          localStorage.setItem('user', JSON.stringify(json.data));
          localStorage.setItem('token', json.token);
          dispatch({ type: 'LOGIN', payload: json.data });
          setError('Authentication successful');
          console.log('authentication successful');
          navigate('/');
        }
      } else {
        setLoading(false);
        setError('Server error, please try again');
      }
    } catch (error) {
      setLoading(false);
      setError('Network error, please try again');
    }
  };

  return { signIn, loading, error };
};
