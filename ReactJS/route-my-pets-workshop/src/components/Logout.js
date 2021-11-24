import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logout } from "../services/authService";

export default function Logout({ onLogout }) {
    useEffect(() => {
        async function logoutFunc() {
            await logout();

            onLogout();
        }
        logoutFunc();
    })

    return <Navigate to="/" replace={true} />
}