import React from 'react';
import { Link } from 'react-router-dom';
import logoImgWhite from '../../../assets/image/logo-educa-simples-brown.png';
import './HomeFooter.css';

const HomeFooter = ({ onLoginClick }) => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <Link to="/" className="logo-footer">
                    <img src={logoImgWhite} alt="Logo Educa Simples" width="auto" height="60px" />
                </Link>

                <p className="footer-text">
                    Este sistema é um sistema desenvolvido para fins educacionais do "Projeto Integrador - 3º Sem." do curso de Desenvolvimento de Software Multiplataforma da FATEC da Zona Leste.
                </p>
                <p className="footer-copy">&copy; {new Date().getFullYear()} Educa Simples. Todos os direitos reservados.</p>
            </div>

            <div className="footer-right">
                <div className="footer-box-links">
                    <p className="footer-title">Links</p>

                    <ul className="footer-list">
                        <li>
                            <a href="https://github.com/kaikdev/agilidade-na-saude" target="_blank" rel="noopener noreferrer">
                                GitHub do Projeto
                            </a>
                        </li>
                        <li>
                            <a href="#sobre">Sobre</a>
                        </li>
                        <li>
                            <a href="#depoimentos">Depoimentos</a>
                        </li>
                        <li>
                            <a href="#faq">FAQ</a>
                        </li>
                        <li>
                            <a href="#contato">Contato</a>
                        </li>
                        {/* Mantendo o link de Login para fins da Home pública, 
                            usando a função de abrir o modal se ela for fornecida. 
                        */}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onLoginClick) onLoginClick();
                                }}
                            >
                                Login
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-box-links">
                    <p className="footer-title">Desenvolvedores</p>

                    <ul className="footer-list">
                        <li>
                            <a href="https://github.com/kaikdev" target="_blank" rel="noopener noreferrer">
                                Kaik Silva
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/user49tbd" target="_blank" rel="noopener noreferrer">
                                Jonathan Moura
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/rogeriobgregorio" target="_blank" rel="noopener noreferrer">
                                Rogério Bernardo
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default HomeFooter;