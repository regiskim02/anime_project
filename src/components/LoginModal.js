import { FiX } from "react-icons/fi";
import styled from "styled-components";

const Modal = styled.div`
    background: #fff;
    width: 100%;
    max-width: 420px;
    border-radius: 12px;
    padding: 24px;
    position: relative;

    .login-title {
    font-size: 20px;
    
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

function LoginModal({isOpen, onClose}) {
    if (!isOpen) return null;

    return (
        <Backdrop onClick={onClose}>
            <Modal onClick={(e)=> e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <FiX size={20}/>
                </CloseButton>
                <h2 className="login-title">Login</h2>

                <input placeholder="Enter username"></input>
                <input type="password" placeholder="Enter password"/>

                <buttom>Login</buttom>
            </Modal>
        </Backdrop>
    );

}

export default LoginModal;