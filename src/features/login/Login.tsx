import AuthForm from "@/components/authform/AuthForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthType, authSchema } from "@/types/AuthTypes";
import { useEffect, useState } from "react";
import Loader from "@/lib/loaders";
import { loginUserByUserNameandEmail } from "./api/login";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useToken } from "@/hooks/useToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({
    resolver: yupResolver(authSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setToken } = useToken();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  const onSubmit = async (data: AuthType) => {
    try {
      const response = await loginUserByUserNameandEmail(data);
      localStorage.setItem("token",response.data.token)
      setToken(response.data.token);
      toast({
        title: "Success",
        description: response.data.message,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading ? (
    <AuthForm
      title="Login"
      description="Enter your username and password"
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  ) : (
    <Loader />
  );
};

export default Login;
