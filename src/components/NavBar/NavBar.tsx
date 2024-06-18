import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// const loggroups: string[] = ["pyspark-1", "pyspark-2"];

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mx-2 my-2 border-b-2">
      <div className="w-max flex items-center">
        <div className="flex items-center gap-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <circle className="dark:fill-white" cx="35.3548" cy="10.7527" r="2.60215" fill="#283570" />
            <circle className="dark:fill-white" cx="29.6774" cy="26.8387" r="2.60215" fill="#283570" />
            <circle className="dark:fill-white" cx="24.4731" cy="19.7419" r="2.60215" fill="#283570" />
            <circle className="dark:fill-white" cx="11.2258" cy="34.4086" r="2.60215" fill="#283570" />
            <circle className="dark:fill-white" cx="37.7204" cy="34.4086" r="2.60215" fill="#283570" />
            <circle className="dark:fill-white" cx="11.2258" cy="19.7419" r="2.60215" fill="#283570" />
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="7"
              stroke="#283570"
              stroke-width="3"
              stroke-linejoin="round"
              className="dark:stroke-white"
            />
            <path
              d="M11.2258 19.9785L35.5102 10.294"
              stroke="#283570"
              stroke-width="2"
              className="dark:stroke-white"
            />
            <path
              d="M11.2258 34.6452L24.4731 19.7419"
              stroke="#283570"
              stroke-width="2"
              className="dark:stroke-white"
            />
            <path
              d="M29.6774 27.0753L35.5914 10.2796"
              stroke="#283570"
              stroke-width="2"
              className="dark:stroke-white"
            />
            <path
              d="M10.9892 34.9342L37.1224 34.1721"
              stroke="#283570"
              stroke-width="2"
              className="dark:stroke-white"
            />
          </svg>

          <Label className="font-bold italic text-[#283570] dark:text-white">
            Zakipoint Health
          </Label>
        </div>
        {/* <img src={zph} className="w-36" /> */}
        {/* <div className="">
          <Select>
            <SelectTrigger className="w-max border-0">
              <SelectValue placeholder="Log Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-sm font-light">
                <SelectLabel>Log Groups</SelectLabel>
                {loggroups.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div> */}
      </div>
      <div className="p-1 flex gap-4 mr-2 items-center">
        <div className="border rounded-full p-2">
          <Bell className="w-4 h-4" />
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <Avatar className="border p-4 w-6 h-6 ">
                <AvatarImage src="" />
                <AvatarFallback>ZP</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Avatar className=" border p-4 w-6 h-6">
                    <AvatarImage src="" />
                    <AvatarFallback>ZP</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Label>{localStorage.getItem("username")}</Label>
                    <span className="text-xs opacity-50">Joined 2024</span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Button className="" onClick={() => {
                    navigate("/")
                    localStorage.clear()
                  }
                  }>
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
