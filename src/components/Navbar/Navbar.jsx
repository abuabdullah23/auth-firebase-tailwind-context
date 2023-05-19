import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProviders/AuthProviders';

const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);

    const handleLogOut = () => {
        userLogOut()
            .then(() => { })
            .catch(error => { console.error(error) })
    }
    return (
        <div className="navbar bg-primary text-primary-content">
            <Link className="btn btn-ghost normal-case text-xl" to='/'>Auth Master</Link>
            <Link className="btn btn-ghost normal-case text-xl" to='/'>Home</Link>
            <Link className="btn btn-ghost normal-case text-xl" to='/orders'>Orders</Link>
            <Link className="btn btn-ghost normal-case text-xl" to='/login'>Login</Link>
            <Link className="btn btn-ghost normal-case text-xl" to='/register'>Register</Link>

            {
                user ? <>
                    <span className='ml-5'>{user.email}</span>
                    <button onClick={handleLogOut} className='btn btn-xs ml-3'>Log Out</button>
                </> : <Link to='/login' className='ml-5'>Login</Link>
            }
        </div>
    );
};

export default Navbar;