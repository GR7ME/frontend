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
  FieldValues,
  Path
} from "react-hook-form";
import { Button } from "@/components/ui/button";

interface AuthProps<T extends FieldValues> {
  title: string;
  description: string;
  onSubmit: SubmitHandler<T>;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  children?: React.ReactNode;
}

const AuthForm = <T extends FieldValues>({
  title,
  description,
  onSubmit,
  register,
  handleSubmit,
  errors,
  children,
}: AuthProps<T>) => {
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
                {...register("username" as Path<T>)}
              />
              {errors.username &&
                typeof errors.username.message === "string" && (
                  <Label className="text-destructive">
                    {errors.username.message}
                  </Label>
                )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password" as Path<T>)}
              />
              {errors.password && typeof errors.password.message === 'string' && (
                <Label className="text-destructive">
                  {errors.password.message}
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
