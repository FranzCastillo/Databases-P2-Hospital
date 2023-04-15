import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";

function Logs() {
    const user = getUser();
    return (
        <div>
            {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
        </div>
    )
}
export default Logs