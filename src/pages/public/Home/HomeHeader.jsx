import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/image/logo-educa-simples-brown.png'; 
import './HomeHeader.css';

// Recebe as funções de callback para abrir os modais
const HomeHeader = ({ onLoginClick, onRegisterClick }) => {
    const [menuActive, setMenuActive] = useState(false);
    const timeoutRef = useRef(null);
    
    // Funções de controle do menu
    function toggleMenu() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setMenuActive(!menuActive);
            timeoutRef.current = null;
        }, 100);
    }

    function handleTouchStart(event) {
        event.preventDefault();
        toggleMenu();
    }
    
    // Função auxiliar para fechar o menu ao clicar em um link
    const closeMenu = () => {
        setMenuActive(false);
    };

    return (
        <header id="header">
            <Link to="/" id="logo" onClick={closeMenu}>
                <img src={logoImg} alt="Logo Agilidade na Saúde" width="auto" height="60" />
            </Link>

            <nav id="nav" className={menuActive ? 'active' : ''}>
                <button
                    aria-label={menuActive ? 'Fechar Menu' : 'Abrir Menu'}
                    id="btn-mobile"
                    aria-haspopup="true"
                    aria-controls="menu"
                    aria-expanded={menuActive}
                    onClick={toggleMenu}
                    onTouchStart={handleTouchStart}
                >
                    <span id="hamburger"></span>
                </button>

                <ul id="menu" role="menu">
                    {/* Itens de navegação PRÉ-LOGIN */}
                    <li>
                        <a href="#sobre" onClick={closeMenu}>Sobre</a>
                    </li>
                    <li>
                        <a href="#depoimentos" onClick={closeMenu}>Depoimentos</a>
                    </li>
                    <li>
                        <a href="#faq" onClick={closeMenu}>FAQ</a>
                    </li>
                    <li>
                        <a href="#contato" onClick={closeMenu}>Contato</a>
                    </li>
                    
                    {/* Botão de Login (Chama a função recebida por prop) */}
                    <li>
                        <a href="#" onClick={() => { onLoginClick(); closeMenu(); }}>
                            Login
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HomeHeader;