import React, { useContext } from 'react';
import { AuthContext } from '../AuthProviders/AuthProviders';

const Home = () => {
    const user = useContext(AuthContext);
    return (
        <div>
            <h3>This is Home {user && <span>{user.displayName}</span> }</h3>
        </div>
    );
};

export default Home;