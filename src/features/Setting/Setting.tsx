import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SettingType, settingSchema } from "@/types/AuthTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { updateUser } from "@/services/user";

const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingType>({
    resolver: yupResolver(settingSchema),
  });
  const { toast } = useToast();
  const onSubmit = (data: SettingType) => {
    const handleUpdateUser = async (data: SettingType) => {
      try {
        const response = await updateUser(data);
        console.log("response: ", response);
        if (response.success) {
          localStorage.setItem("username", response.data.data.user.username);
          localStorage.setItem("email", response.data.data.user.email);
          toast({
            title: response.data.data.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: response.data,
          });
        }
      } catch (error) {
        console.log(error)
        // toast({
        //   variant: "destructive",
        //   title: error
        // });
      }
    };

    handleUpdateUser(data);
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
              <Label>Current Password</Label>
              <Input
                type="password"
                {...register("current_password", { required: true })}
                className="w-full border rounded p-2 text-sm"
              />
              {errors.current_password && (
                <Label className="text-destructive">
                  {errors.current_password?.message}
                </Label>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Label>New Password</Label>
              <Input
                defaultValue={localStorage.getItem("email") ?? ""}
                type="password"
                {...register("new_password")}
                className="w-full border rounded p-2 text-sm"
              />
              {errors.new_password && (
                <Label className="text-destructive">
                  {errors.new_password?.message}
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
