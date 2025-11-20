import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import usePasswordToggle from '../../../../../hooks/usePasswordToggle';
import Swal from 'sweetalert2';
function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //const [errors, setErrors] = useState({});

    const [showPasswordStates, togglePasswordVisibility] = usePasswordToggle({
        loginSenha: false,
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        //setLoading(true);

        try {
            const payload = { email: email, password: password }
            let result = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((e) => e.json())
            //console.log(result)
            if (result.token) {
                localStorage.setItem("token", result.token)
                //console.log("the role is "+result.role)
                localStorage.setItem("role", result.role)
            } else {
                //setLoading(false);
                throw new Error("credenciais invalidas");
            }
            close()
            navigate('/index');
            //setLoading(false);
            setEmail('');
            setPassword('');
        } catch (e) {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Credenciais Invalidas',
                text: e.msgError //'Erro interno no Servidor.'
            });
        }
        // Simulação de login
        /*
        setTimeout(() => {
            // Fecha o modal
            const modalElement = document.getElementById('modalLogin');
            if (modalElement) {
                const bootstrapModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                bootstrapModal.hide();
            }

            // Redireciona para a página /index
            navigate('/index');

            setLoading(false);
            setEmail('');
            setPassword('');
        }, 1000);*/
    };
    function close() {
        const modalElement = document.getElementById('modalLogin');
        if (modalElement) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            bootstrapModal.hide();
        }
    }

    return (
        <div className="modal fade" id="modalLogin" tabIndex="-1" aria-labelledby="modalLoginLabel" aria-hidden="true">
            <div className="modal-dialog modal-login modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>

                        <h6 className="modal-title" id="modalLoginLabel">Login</h6>

                        <form onSubmit={handleLoginSubmit}>
                            <div className="item-input mb-3">
                                <label className="icon-input" htmlFor="loginEmail">
                                    <i className="fa-solid fa-envelope"></i>
                                </label>

                                <input
                                    type="email"
                                    id="loginEmail"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="item-input password mb-3">
                                <label className="icon-input" htmlFor="loginSenha">
                                    <i className="fa-solid fa-lock"></i>
                                </label>

                                <input
                                    type={showPasswordStates.loginSenha ? 'text' : 'password'}
                                    id="loginSenha"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />

                                <button className="show-password" type="button" onClick={() => togglePasswordVisibility('loginSenha')}>
                                    {showPasswordStates.loginSenha ?
                                        (<i className="fa-solid fa-eye-slash"></i>) :
                                        (<i className="fa-solid fa-eye"></i>)
                                    }
                                </button>
                            </div>

                            <button className="btn-default mb-3" type="submit" disabled={loading}>
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>

                        <a className="forgot-password" href="#" data-bs-toggle="modal" data-bs-target="#modalRecover" data-bs-dismiss="modal">
                            Esqueceu a senha?
                        </a>

                        <div className="footer-login">
                            <span>
                                Não tem uma conta?
                                <a href="#" data-bs-toggle="modal" data-bs-target="#modalCadastro" data-bs-dismiss="modal">
                                    Cadastre-se
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;