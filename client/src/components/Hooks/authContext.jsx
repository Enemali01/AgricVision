import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/api";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true)
        const response = await api.get("/users/verify"); 
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Something Went Wrong!' || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // Login sets the user after backend sets cookie
  const login = (user) => {
    setUser(user);
  };

  // Logout: clear cookie on server
  const logout = async () => {
    try {
      await api.post("/api/users/logout");
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);
export default AuthContext;
