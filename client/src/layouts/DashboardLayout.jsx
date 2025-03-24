import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative md:flex min-h-screen">
            <div className="">
                <Sidebar></Sidebar>
            </div>

            <div className=" flex-1 ml-64">
                <div className="p-5">
                    <Outlet></Outlet>
                </div>
            </div>
            
        </div>
    );
};

export default DashboardLayout;