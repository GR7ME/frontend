import Loader from "@/lib/loaders";
import { getUser } from "@/services/auth";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode
}

const ProtectedLayout = ({ children } : Props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await getUser();
      if (response.valid) {
        setIsAuthenticated(true);
        console.log(response.data)
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("username",response.data.username)
      } else {
        setIsAuthenticated(false);
        navigate("/auth/login");
      }
    };
    checkAuthentication();
  }, [navigate]);

  if (!isAuthenticated) {
    return <Loader />;
  }
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedLayout;
