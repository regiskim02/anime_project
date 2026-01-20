import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { isLoggedIn, logout } from "../services/authService";

const StyledHeader = styled.header`
    background-color: white;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;

    .logo {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    }

    .search {
        width: 510px;
        height: 42px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 10px;
        padding: 8px 40px 8px 16px;
        box-sizing: border-box;
        font-size: 16px;
    }

    .search-container {
    position: relative;
    }

    .search-icon {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 20px;
    pointer-events: none; /* click goes to input */
    }

    .login {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    padding: 8px 16px;
    background-color: #155dfc;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    box-sizing: border-box;
    border: none;
    }

    .login-icon {
    font-size: 20px;
    }

    .logout {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    padding: 8px 16px;
    background-color: #155dfc;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: white;
    box-sizing: border-box;
    border: none;
    font-size: 13px;
    }

`



function Header({onSearch, onReset, isAuthenticated, onLoginClick, onLogout}) {

    const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
        onSearch(e.target.value);
    }
};

    return(
        <StyledHeader>
            <div className="logo" onClick={onReset} >Anime Tracker</div>
                <div className="search-container">
                <input className="search" placeholder="Search anime..." type="text" onKeyDown={handleKeyDown} id="searchInput"></input>
                <CiSearch className="search-icon"/>
                </div>
                <div className="login-container">
                    {isAuthenticated ? (
                        <button className="logout" onClick={onLogout}>
                            Logout
                        </button>
                    ) : (
                        <button className="login" onClick={onLoginClick}>
                            <FiUser className="login-icon" />
                            Login
                        </button>
                    )}

                </div>
        </StyledHeader>
    );
}

export default Header;