import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {useEffect, useState} from 'react';

function NotFound() {
    const user = getUser();
    const [rol, setRol] = useState([]);
    user.then(objeto => {
        setRol(objeto["rol"]);
        console.log(rol); // "admin"
    });
    return (
        <div>
            {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
            <h1> 404 </h1>
            <h3> Page not found </h3>

        </div>
    )
}

export default NotFound