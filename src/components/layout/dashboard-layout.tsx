import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar/SideBar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <>
      <NavBar />
      <div className="flex w-full mb-2 gap-2">
        <Sidebar />
        <div className="border-2 mr-2 w-full p-2 rounded-sm">
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
