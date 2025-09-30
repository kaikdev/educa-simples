import React, { useState } from 'react';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import HomeContent from './HomeContent';
//import LoginModal from './components/LoginModal/LoginModal'; // Descomente para testes
//import RegisterModal from './components/RegisterModal/RegisterModal'; // Descomente para testes

function Home() {
    // ESTADO: Controla a visibilidade dos modais.
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // FUNÇÕES: Lógica de abertura e fechamento (apenas controle de estado local)
    const openLogin = () => {
        // Garantimos que apenas um modal esteja aberto por vez
        setIsRegisterOpen(false); 
        setIsLoginOpen(true);
    };
    
    const openRegister = () => {
        // Garantimos que apenas um modal esteja aberto por vez
        setIsLoginOpen(false); 
        setIsRegisterOpen(true);
    };

    const closeModal = () => {
        // Fecha ambos (ou aquele que estiver aberto)
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };
    // FIM DAS FUNÇÕES DE CONTROLE

    return (
        <div className="home-page-container">
            {/* AGORA AS FUNÇÕES openLogin E openRegister ESTÃO DEFINIDAS NO ESCOPO */}
            <HomeHeader
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
            />

            <HomeContent />

            <HomeFooter onLoginClick={openLogin} />

            {/* AQUI ESTAMOS USANDO A RENDERIZAÇÃO CONDICIONAL */}
            {isLoginOpen && (
                <LoginModal
                    onClose={closeModal}
                    onSwitchToRegister={openRegister}
                />
            )}
            {isRegisterOpen && (
                <RegisterModal
                    onClose={closeModal}
                    onSwitchToLogin={openLogin}
                />
            )}
        </div>
    );
}

export default Home;