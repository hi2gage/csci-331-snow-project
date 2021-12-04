import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button';
import './Navbar.css';
import { useHistory } from 'react-router';

function Navbar({ userStatus }) {
    let history = useHistory();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true)
        }
    };

    const Logout = () => {
        console.log("Logout");
        sessionStorage.clear()
        history.push('/')
        window.location.reload(false);
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        SNOW <i class="fas fa-snowflake"></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>


                        {userStatus ?
                        (
                        <li className='nav-item'>
                            <Link to='/api' className='nav-links' onClick={closeMobileMenu}>
                                API
                            </Link>
                        </li>
                        ) : (null)}
                        {!userStatus ?
                        (
                        <li className='nav-item'>
                            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                                Log In
                            </Link>
                        </li>
                        ) : (
                            <Link to='/' className='nav-links' onClick={Logout}>
                                Log out
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
