import React, { useState } from 'react';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import HomeContent from './HomeContent';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RecoverPasswordModal from './components/modals/RecoverPasswordModal';

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
            {/* AGORA AS FUNÇÕES openLogin E openRegister ESTÃO DEFINIDAS NO ESCOPO <contextTheme.Provider value={openLogin()}>*/}
            <HomeHeader
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
            />

            <HomeContent />

            <HomeFooter onLoginClick={openLogin} />

            <LoginModal />

            <RegisterModal closeRef={openLogin}/>

            <RecoverPasswordModal />
        </div>
    );
}

export default Home;