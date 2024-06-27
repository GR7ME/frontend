import AuthForm from "@/components/authform/AuthForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupType, signUpSchema } from "@/types/AuthTypes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { createUser } from "./api/create-user";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({
    resolver: yupResolver(signUpSchema),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupType) => {
    if (data.password != data.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      })
    }
    try {
      const response = await createUser(data);
      toast({
        title: "Success",
        description: response.data.message || "user successfully created",
      });
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm
      title="Create an account"
      description="Enter details to create your account"
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <Label className="text-destructive">
            {errors.confirmPassword?.message}
          </Label>
        )}
      </div>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <Label className="text-destructive">{errors.email?.message}</Label>
          )}
        </div>
      </div>
    </AuthForm>
  );
};

export default SignUp;
