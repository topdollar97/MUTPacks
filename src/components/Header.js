import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () =>{
    return(
        <div className="ui inverted menu">
            <Link to="/" className="ui header item">
                MUTPacks.gg
            </Link>
            <Link to="/newPack" className="ui item">
                Add a Pack
            </Link>
            <div className="ui right inverted menu">
                <GoogleAuth />
            </div>
        </div>
    );
};

export default Header;