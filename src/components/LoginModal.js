import { useState } from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";
import { login, signup } from "../services/authService";


const Modal = styled.div`
    background: #fff;
    width: 100%;
    max-width: 420px;
    border-radius: 12px;
    padding: 24px;
    position: relative;
    display: flex;
    flex-direction: column;

    .login-title {
    font-size: 20px;
    }

    input {
    width: 400px;
    height: 42px;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.21);
    box-sizing: border-box;
    font-size: 16px;
    }

    .login-button{
    padding: 8px;
    font-size: 16px;
    color: white;
    background-color: #155dfc;
    margin-top: 18px;
    box-sizing: border-box;
    border-radius: 10px;
    border: none;
    width: 400px;
    }

    .button-link {
    margin-top: 18px;
    background: none; /* Remove background color */
    border: none; /* Remove border */
    padding: 0; /* Remove padding */
    color: #155dfc;; /* Set typical link color (blue) */
    text-decoration: underline; /* Add underline like a link */
    cursor: pointer; /* Change cursor to a hand icon on hover */
    font-family: inherit; /* Inherit font from parent */
    font-size: 16px;
    text-decoration: none;
    }

    .button-link:hover,
    .button-link:focus {
    color: #0d58f9ff;
    text-decoration: underline;
    
    }
`;
const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
`;
const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

function LoginModal({isOpen, onClose, onLoginSuccess}) {
    const [mode, setMode] = useState("login");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        if (mode === "login") {
            await login({ username, password }); 
            onLoginSuccess();                    
            onClose();
        } else {
            await signup({ username, password });
            setMode("login");
        }
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Backdrop onClick={onClose}>
            <Modal onClick={(e)=> e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <FiX size={20}/>
                </CloseButton>
                <h2 className="login-title">
                    {mode === "login" ? "Login" : "Register"}
                </h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {mode === "login" ? (
                    <>
                    <form onSubmit={handleSubmit}>
                        <h3>Username</h3>
                        <input 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}>
                        </input>
                        <h3>Password</h3>
                        <input 
                            type="password" 
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button 
                            className="login-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
                        </button>
                    </form>
                        <button className="button-link" onClick={() => setMode("register")}>Don't have an account? Register</button>
                    </>
                ) : (
                    <>
                    <form onSubmit={handleSubmit}>
                        <h3>Username</h3>
                        <input 
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}>
                        </input>
                        <h3>Password</h3>
                        <input 
                            type="password" 
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button 
                            className="login-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
                        </button>
                        <button className="button-link" onClick={() => setMode("login")}>Already have an account? Login</button>
                        </form>
                    </>
                )}
            </Modal>
        </Backdrop>
    );

}

export default LoginModal;