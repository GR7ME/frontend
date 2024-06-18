import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

interface AuthProps {
  title: string;
  description: string;
  onSubmit: SubmitHandler;
  register: UseFormRegister;
  handleSubmit: UseFormHandleSubmit;
  errors: FieldErrors;
  children?: React.ReactNode;
}

const AuthForm = ({
  title,
  description,
  onSubmit,
  register,
  handleSubmit,
  errors,
  children,
}: AuthProps) => {
  return (
    <Card className="w-80 md:w-96">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <Label className="text-destructive">
                  {errors.username?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <Label className="text-destructive">
                  {errors.password?.message}
                </Label>
              )}
            </div>
            {children}
            <Button type="submit">{title}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
