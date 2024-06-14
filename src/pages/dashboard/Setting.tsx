import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SettingType, settingsSchema } from "@/types/AuthTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CloudUpload } from "lucide-react";

const SettingsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingType>({
    resolver: yupResolver(settingsSchema),
  });

  const onSubmit = (data: SettingType) => {
    console.log(data);
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
                type="text"
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
          <div className="flex flex-col gap-4 mt-4 border rounded p-4">
            <Label>Your Photo</Label>
            <Separator />
            <div>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>ZP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col p-2 gap-2">
                  <Label className="text-xs">Edit Your Photo</Label>
                  <div className="flex gap-2">
                    <Button type="button" variant="destructive" className="p-2">
                      Delete
                    </Button>
                    <Button type="button" variant="ghost" className="p-2">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContextMenu>
                <ContextMenuTrigger className="flex flex-col gap-2 h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                  <div>
                    <CloudUpload className="opacity-75" />
                  </div>
                  <div>Click to update or drag and drop svg,png</div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem inset>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem inset disabled>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem inset>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger inset>
                      More Tools
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                      <ContextMenuItem>
                        Save Page As...
                        <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                      <ContextMenuItem>Name Window...</ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem>Developer Tools</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuSeparator />
                  <ContextMenuCheckboxItem checked>
                    Show Bookmarks Bar
                    <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                  </ContextMenuCheckboxItem>
                  <ContextMenuCheckboxItem>
                    Show Full URLs
                  </ContextMenuCheckboxItem>
                  <ContextMenuSeparator />
                  <ContextMenuRadioGroup value="pedro">
                    <ContextMenuLabel inset>People</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuRadioItem value="pedro">
                      Pedro Duarte
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="colm">
                      Colm Tuite
                    </ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
