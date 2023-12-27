import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";

const DashLayout = () => {
    return (
        <div>
            <DashHeader />
            <Outlet />
        </div>
    )
}

export default DashLayout;