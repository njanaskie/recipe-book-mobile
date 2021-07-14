import React from 'react';
import { Link } from 'react-router-dom';
import SubHeader from './SubHeader'

export const Header = () => {

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to='/home' >
                        <img className="logo__image" src="/images/app-logo.png" />
                    </Link>
                    <SubHeader />
                </div>
            </div>
        </header>
    )
};


export default Header;