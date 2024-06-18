import AuthForm from "@/components/AuthForm/AuthForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthType, authSchema } from "@/types/AuthTypes";
import { useEffect, useState } from "react";
import Loader from "@/lib/loaders";
import { loginUserByUserNameandEmail } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  const onSubmit = async (data: AuthType) => {
    try {
      const response = await loginUserByUserNameandEmail(data);

      if (response.data.success === false) {
        toast({
          variant: "destructive",
          title: "Error occurred!!",
          description: response.data.message,
        });
      } else {
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Success",
          description: response.data.message,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      // Check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Handle errors that occur during the API call
        const errorMessage =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.error("Error during login:", errorMessage);
        toast({
          variant: "destructive",
          title: "Error occurred!!",
          description: errorMessage,
        });
      } else {
        // Handle non-Axios errors
        console.error("An unexpected error occurred:", error);
        toast({
          variant: "destructive",
          title: "Error occurred!!",
          description: "An unexpected error occurred. Please try again.",
        });
      }
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
