import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
function NotFound() {
    const user = getUser();
    return (
        <div>
            {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
            <h1> 404 </h1>
            <h3> Page not found </h3>

        </div>
    )
}

export default NotFound