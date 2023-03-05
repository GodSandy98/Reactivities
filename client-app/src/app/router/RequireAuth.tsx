import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireAuth() {
    const {userStore: {IsLoggedIn}} = useStore();
    const location = useLocation();

    if (!IsLoggedIn) {
        return <Navigate to='/' state={{from: location}} />
    }

    return <Outlet />

}