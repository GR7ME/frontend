import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api-client";
import { SettingType, settingsSchema } from "@/types/AuthTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingType>({
    resolver: yupResolver(settingsSchema),
  });

  const onSubmit = (data: SettingType) => {
    const updateUserDetails = async () => {
      const response = await api.patch("/auth/update-user/",data,{
        headers: {
          Authorization: "Token " + localStorage.getItem("token")
        }
      })
      console.log(response)
      localStorage.setItem("username",response.data.user.username)
      localStorage.setItem("email",response.data.user.email)
    } 
    updateUserDetails()
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex justify-between mb-4">
          <div className="flex flex-col">
            <Label className="text-xl">Settings</Label>
            <Label className="text-xs opacity-50">
              Manage your account settings
            </Label>
          </div>
          <Button type="submit">Save</Button>
        </div>
        <Separator />
        <div className="flex justify-between gap-2">
          <div className="grow flex flex-col gap-4 mt-4 border rounded p-4">
            <Label>Personal Information</Label>
            <Separator />
            <div className="flex flex-col gap-4">
              <Label>Username</Label>
              <Input
                defaultValue={localStorage.getItem("username") ?? ""}
                placeholder="hello"
                {...register("username", { required: true })}
                className="w-full border rounded p-2 text-sm"
              />
              {errors.username && (
                <Label className="text-destructive">
                  {errors.username?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Label>Email</Label>
              <Input
                defaultValue={localStorage.getItem("email") ?? ""}
                type="email"
                {...register("email")}
                className="w-full border rounded p-2 text-sm"
              />
              {errors.email && (
                <Label className="text-destructive">
                  {errors.email?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Label>Password</Label>
              <Input
                type="password"
                {...register("password", { required: true })}
                className="w-full border rounded p-2 text-sm"
              />
              {errors.password && (
                <Label className="text-destructive">
                  {errors.password?.message}
                </Label>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
