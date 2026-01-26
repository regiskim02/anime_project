import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { useEffect,useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { GoClock } from "react-icons/go";


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

    .profile-wraper {
    display: flex;
    align-items: cneter;
    gap: 12px;
    position: relative;
    }

    .profile-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    }

    .profile-dropdown {
    position: absolute;
    top: 52px;
    right: 0;
    width: 180px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    overflow: hidden;
    z-index: 100;
    }

    .profile-dropdown .item {
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    }

    .profile-dropdown .item:hover {
    background-color: #f3f4f6;
    }

`



function Header({onSearch, onReset, isAuthenticated, onLoginClick, onLogout, onFilter}) {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            const el = profileRef.current;
            if (!el) return;

            if (!el.contains(e.target)) {
                setIsProfileOpen(false);
            }
            }
            if (!isAuthenticated) {
                setIsProfileOpen(false);
            }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isAuthenticated]);

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
                        <div className="profile-wraper" ref={profileRef}>
                            <button className="profile-btn" onClick={() => {
                                setIsProfileOpen(prev => !prev)
                            }}><FiUser/></button>

                            {isProfileOpen && (
                                <div className="profile-dropdown">
                                    <div className="item" onClick={() => {onFilter("FAVORITE"); setIsProfileOpen(false);}}><CiHeart/> Favorites</div>
                                    <div className="item" onClick={() => {onFilter("WATCHING"); setIsProfileOpen(false)}}><MdOutlineRemoveRedEye/> Watching</div>
                                    <div className="item" onClick={() => {onFilter("COMPLETED"); setIsProfileOpen(false)}}><IoCheckmark/> Completed</div>
                                    <div className="item" onClick={() => {onFilter("PLAN"); setIsProfileOpen(false)}}><GoClock/> Plan to Watch</div>
                                </div>
                            )}
                            <button className="logout" onClick={() => {
                                onLogout();
                                setIsProfileOpen(false);
                            }}>
                                Logout
                            </button>
                        </div>
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