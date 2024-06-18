import { Button } from "@/components/ui/button";
import { DashboardIcon, ReaderIcon, GearIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";

import { useTheme } from "@/context/themeprovider";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="md:p-2 border-r-2 ml-2 rounded-sm">
      <span className="text-xs opacity-50 text-center p-4 mb-4">MAIN</span>

      <ul className="w-full flex flex-col gap-1 mb-2">
        <li>
          <Button
            variant="ghost"
            className="flex gap-2 hover:text-primary"
            onClick={() => navigate("/dashboard")}
          >
            <DashboardIcon />
            <span className="hidden md:block lg:block xl:block">Dashboard</span>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="flex gap-2 hover:text-primary"
            onClick={() => navigate("/dashboard/logs")}
          >
            <ReaderIcon />
            <span className="hidden md:block lg:block xl:block">Logs</span>
          </Button>
        </li>
      </ul>
      <span className="text-xs opacity-50 text-center p-4">ACTIONS</span>
      <ul className="w-full flex flex-col gap-1 mb-2">
        <li>
          <Button
            variant="ghost"
            className="flex gap-2 hover:text-primary"
            onClick={() => navigate("/dashboard/settings")}
          >
            <GearIcon />
            <span className="hidden md:block lg:block xl:block">Settings</span>
          </Button>
        </li>
        <li className="flex items-center gap-2 p-4">
          <span className="text-sm text-center">Mode</span>
          <Switch
            onCheckedChange={() =>
              theme == "light" ? setTheme("dark") : setTheme("light")
            }
          />
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
