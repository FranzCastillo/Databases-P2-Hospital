import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
function Users() {
    const user = getUser();
    return (
        <div>
            {console.log(user)}
            {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}

        </div>
    )
}
export default Users