import {supabase} from "../../supabase/client";

let user = null;
let email = '';

const setUser = (newUser) => {
    user = {...user, ...newUser};
};

const setUserEmail = (newEmail) => {
    email = newEmail;
};

const getUser = async () => {
    const session = await supabase.auth.getSession();
    await setUserEmail(session.data.session.user.email);
// Sets the user information in /components/UserInfo.js
    const medic = await supabase
        .from("medicos")
        .select("*")
        .eq('correo', email);
    setUser(medic.data[0]);

    const places = await supabase
        .from("trabajos")
        .select("lugar_id")
        .eq('medico_id', medic.data[0].id);
    setUser({place: places.data[0].lugar_id});

    const specialty = await supabase
        .from("especializados")
        .select("especialidad_id")
        .eq('medico_id', medic.data[0].id);
    setUser({specialty: specialty.data[0].especialidad_id});

    return user;
};
export {getUser, setUserEmail};
