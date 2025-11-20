import React, { useState } from 'react';
import './Modal.css';
import Swal from 'sweetalert2';
function RecoverPasswordModal() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRecoverPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo Obrigatório',
                text: 'Por favor, insira seu endereço de e-mail.',
                confirmButtonText: 'Ok'
            });
            return;
        }
        try {
            let result = await fetch("http://localhost:3000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ email: email })
            }).then((el) => el.json())
            console.log(result)
            console.log("enviado")
            setTimeout(() => {
                Swal.fire({
                    icon: 'info',
                    title: 'Solicitação Enviada',
                    text: "Se um e-mail correspondente for encontrado em nosso sistema, um link para redefinição de senha será enviado.",
                    confirmButtonText: 'Ok'
                }).then(() => {
                    setEmail('');

                    // Fechar modal (usando Bootstrap)
                    const modalElement = document.getElementById('modalRecover');
                    if (modalElement) {
                        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
                        if (modalInstance) {
                            modalInstance.hide();
                        }
                    }
                });

                //setLoading(false);
            }, 1500);
        } catch (e) {
            console.log(e)
            Swal.fire({
                icon: 'warning',
                title: 'Erro',
                text: 'erro ao enviar email',
                confirmButtonText: 'Ok'
            });
        }

        //setLoading(true);

        // Simulação de envio de recuperação de senha

    };

    return (
        <div className="modal fade" id="modalRecover" tabIndex="-1" aria-labelledby="modalRecoverLabel" aria-hidden="true">
            <div className="modal-dialog modal-login modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>

                        <h6 className="modal-title" id="modalRecoverLabel">Recuperar Senha</h6>

                        <form onSubmit={handleRecoverPasswordSubmit}>
                            <div className="item-input mb-3">
                                <label className="icon-input" htmlFor="recoverEmail">
                                    <i className="fa-solid fa-envelope"></i>
                                </label>

                                <input
                                    type="email"
                                    id="recoverEmail"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button className="btn-default" type="submit" disabled={loading}>
                                {loading ? 'Enviando...' : 'Recuperar'}
                            </button>
                        </form>

                        <div className="footer-login">
                            <span>
                                Lembrou a sua senha?

                                <a href="#" data-bs-toggle="modal" data-bs-target="#modalLogin" data-bs-dismiss="modal">
                                    Entrar
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverPasswordModal;