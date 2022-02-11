import './Header.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LogOutForm from '../../../logoutform/LogoutForm';

function Header() {
    const location = useLocation();

    return (
        <>
            <div className="main-header fixed-top">
                <div className="header-left"></div>
                <div>
                    {location.pathname === '/' ? (
                        <h2 className="header-name">Discover</h2>
                    ) : location.pathname.includes('/profile') ? (
                        <h2 className="header-profile">Profile details</h2>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="header-right">
                    {location.pathname === '/' ? (
                        <button className="btn">
                            <i className="bi bi-sliders2"></i>
                        </button>
                    ) : location.pathname.includes('/profile') ? (
                        <button
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#LogoutModal"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <LogOutForm />
        </>
    );
}

export default Header;
