import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div>
            <div> Side Bar</div>

            <div>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashboardLayout;