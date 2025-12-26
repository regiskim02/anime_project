import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";




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
    width: 68px;
    height: 24px;
    border-radius: 10px;
    padding: 8px 16px;
    background-color: #155dfc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    }

    .login-icon {
    font-size: 20px;
    }

`



function Header() {
    return(
        <StyledHeader>
            <div className="logo">Anime Tracker</div>
                <div className="search-container">
                <input className="search" placeholder="Search anime..."></input>
                <CiSearch className="search-icon"/>
                </div>
                <div className="login">
                    <FiUser className="login-icon"/>
                    Login
                </div>
        </StyledHeader>
    );
}

export default Header;