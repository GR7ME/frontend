import { Outlet } from "react-router-dom";
import zph from "../assets/zph.webp"

const LoginLayout = ()=>{
    return <>
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
    <img src={zph} className="h-24"></img>
    <Outlet/>
    </div>
    </>
}

export default LoginLayout;