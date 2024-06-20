import { useToken } from "@/hooks/useToken";
import { useUser } from "@/hooks/useUser";
import Loader from "@/lib/loaders";
import { getUser } from "@/services/auth";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useUser();
  const { token } = useToken();
  
  useEffect(() => {
    console.log(token)
    const checkAuthentication = async () => {
      const response = await getUser(token);
      if (response.success) {
        setIsAuthenticated(true);
        setUser({
          email: response.data.email,
          username: response.data.username,
        });
      } else {
        setIsAuthenticated(false);
        navigate("/auth/login");
      }
    };
    checkAuthentication();
  }, [navigate, setUser,token]);

  if (!isAuthenticated) {
    return <Loader />;
  }
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedLayout;
