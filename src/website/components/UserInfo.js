let user = null;

const setUser = (newUser) => {
    user = {...user, ...newUser};
};

export {user, setUser};
