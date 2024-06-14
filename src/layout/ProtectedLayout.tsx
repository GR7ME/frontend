import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  return token ? <>{children}</> : null;
};

export default ProtectedLayout;
