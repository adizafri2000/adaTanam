import React, { useState } from 'react';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, name, id, token) => {
        // Store the user's data in the state
        setUser({ email, name, id, token });
    };

    const logout = () => {
        // Clear the user's data from the state
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;