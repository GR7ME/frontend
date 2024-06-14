import AuthForm from "@/components/AuthForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupType, signUpSchema } from "@/types/AuthTypes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignupType) => console.log(data);

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
