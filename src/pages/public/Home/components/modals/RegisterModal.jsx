import React, { useState, useRef, useEffect, useContext } from 'react';
import './Modal.css';
import usePasswordToggle from '../../../../../hooks/usePasswordToggle';
//import Swal from "sweetalert2"
import Swal from 'sweetalert2';
import { toast } from "sonner";
function RegisterModal(props) {
    //Errors
    /*
    const handleCadastroSuccess = () => {
        // Fecha este modal e abre o login
        closeRef(); // <-- chama openLogin do Home
    };*/
    const [errors, setErrors] = useState({});

    const [cadastroNome, setCadastroNome] = useState('');
    const [cadastroEmail, setCadastroEmail] = useState('');
    const [cadastroCpf, setCadastroCpf] = useState('');
    const [cadastroData, setCadastroData] = useState('');
    const [cadastroSenha, setCadastroSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [selectedRole, setSelectedRole] = useState('user');

    // Campos para Médico (Admin)
    const [crm, setCrm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [presentation, setPresentation] = useState('');

    // Campos Imagem
    const [imageFile, setImageFile] = useState(null);
    const imageInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Loading
    const [cadastroLoading, setCadastroLoading] = useState(false);

    const [showPasswordStates, togglePasswordVisibility] = usePasswordToggle({
        cadastroSenha: false,
        confirmarSenha: false,
    });

    useEffect(() => {
        setImageFile(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = null;
        }
        //setErrors({})
    }, [selectedRole]);

    useEffect(() => {
        if (!imageFile) {
            setImagePreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleRemoveImage = () => {
        setImageFile(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = null;
        }
    };

    const handleCpfChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.substring(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCadastroCpf(value);
    };

    /*
    const isValidCpf = (cpf) => {
        const cpfDigits = cpf.replace(/\D/g, '');
        return cpfDigits.length === 11;
    };*/


    /*
    const handleCadastroSubmit = async (e) => {
        e.preventDefault();
        setCadastroLoading(true);

        // Validações locais
        if (cadastroSenha !== confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'As senhas não coincidem. Por favor, verifique.',
            });
            setCadastroLoading(false);
            return;
        }

        if (!isValidCpf(cadastroCpf)) {
            Swal.fire({
                icon: 'error',
                title: 'CPF Inválido',
                text: 'Por favor, insira um CPF válido com 11 dígitos.'
            });
            setCadastroLoading(false);
            return;
        }

        // Validações específicas por tipo de usuário
        if (selectedRole === 'user') {
            if (!cadastroData || !imageFile) {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção!',
                    text: 'Data de Nascimento e Foto do Documento são obrigatórios para Pacientes.',
                });
                setCadastroLoading(false);
                return;
            }
        } else if (selectedRole === 'admin') {
            if (!crm || !specialty || !presentation || !imageFile) {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção!',
                    text: 'Todos os campos (CRM, Especialidade, Apresentação e Imagem de Perfil) são obrigatórios para Médicos.',
                });
                setCadastroLoading(false);
                return;
            }
        }

        // Simulação de cadastro bem-sucedido
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro Realizado!',
                text: `${selectedRole === 'user' ? 'Paciente' : 'Médico'} cadastrado com sucesso!`,
                confirmButtonText: 'Ok'
            });

            // Limpar formulário
            setCadastroNome('');
            setCadastroEmail('');
            setCadastroCpf('');
            setCadastroData('');
            setCadastroSenha('');
            setConfirmarSenha('');
            setSelectedRole('user');
            setCrm('');
            setSpecialty('');
            setPresentation('');
            setImageFile(null);
            if (imageInputRef.current) {
                imageInputRef.current.value = null;
            }

            setCadastroLoading(false);
        }, 1500);
    };*/
    const handleCadastroSubmit = async (e) => {
        e.preventDefault();
        //setCadastroLoading(true);

        let validationErrors = {};

        // Nome
        if (!cadastroNome.trim()) validationErrors.name = "Digite seu nome.";

        // Email
        if (!isValidEmail(cadastroEmail))
            validationErrors.email = "Digite um email válido.";

        // Senhas
        if (!isValidPassword(cadastroSenha))
            validationErrors.senha = "A senha deve ter pelo menos 6 caracteres.";

        if (cadastroSenha !== confirmarSenha)
            validationErrors.confirmarSenha = "As senhas não coincidem.";

        // CPF (somente para admin e quando aparecer no form)
        if (selectedRole === 'admin' && !isValidCpf(cadastroCpf))
            validationErrors.cpf = "CPF inválido.";

        // Paciente precisa de data e imagem
        if (selectedRole === 'user') {
            if (!cadastroData) validationErrors.data = "Data de nascimento é obrigatória.";
            if(getAge() < 5){
                validationErrors.data = "Idade deve ser maior que 5 anos"
            }
            //if (!imageFile) validationErrors.imagem = "Envie a foto do documento.";
        }

        // Admin precisa de tudo
        if (selectedRole === 'admin') {
            //if (!crm.trim()) validationErrors.crm = "CRM é obrigatório.";
            if (!specialty.trim()) validationErrors.specialty = "Especialidade é obrigatória.";
            if (!presentation.trim()) validationErrors.presentation = "Descrição é obrigatória.";
            //if (!imageFile) validationErrors.image = "Envie a foto de perfil.";
        }

        // ❌ Se houver erros, mostra e para
        let res = await checkUnique(validationErrors)
        validationErrors = res
        console.log(validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log(validationErrors)
            /*
            Object.keys(validationErrors).forEach((e)=>{
                toast.error(`${e}:${validationErrors[e]}`);
            })*/
            Swal.fire({
                icon: 'error',
                title: 'Campos inválidos',
                text: 'Verifique os campos destacados.'
            });
            setCadastroLoading(false);
            return;
        }

        setErrors({}); // limpar erros

        // Simulação de envio
        const payload = {
            name: cadastroNome,
            email: cadastroEmail,
            password: cadastroSenha,
            roles: [{ name: selectedRole }],
            //imagem: imageFile ? imageFile.name : null,

            // Apenas se for usuário
            ...(selectedRole === 'user' && {
                userAluno: {
                    //dataNascimento: cadastroData,
                    age: getAge()//cadastroData
                }
            }),

            // Apenas se for médico/admin
            ...(selectedRole === 'admin' && {
                userAdmin: {
                    cpf: cadastroCpf,
                    especialidade: specialty,
                    apresentacao: presentation
                }
            })
        };
        console.log(payload)
        try {
            let result = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then((e) => e.json())
            console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Cadastro Realizado!',
                text: "Cadastro efetuado com sucesso!",
            });
            setTimeout(()=>{
                close()
            },2000)
            //theme()
            //props.closeRef()
            /*setTimeout(() => {
                handleCadastroSuccess()
            }, 1500)*/
            //window.location.href = "/login"
        } catch (e) {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Erro no Servidor',
                text: e.msgError //'Erro interno no Servidor.'
            });
        }
        /*
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro Realizado!',
                text: "Cadastro efetuado com sucesso!",
            });

            // limpar…
            setCadastroNome('');
            setCadastroEmail('');
            setCadastroCpf('');
            setCadastroData('');
            setCadastroSenha('');
            setConfirmarSenha('');
            setImageFile(null);

            setCadastroLoading(false);
        }, 1500);*/
    };
    //setCadastroLoading(false)

    const imageInputLabel = selectedRole === 'admin' ? 'Foto de Perfil' : 'Foto do Documento';
    const imageInputId = selectedRole === 'admin' ? 'adminImage' : 'userDocumentImage';

    function getAge() {
        let dtNow = new Date()
        let dtcad = new Date(cadastroData)
        return dtNow.getFullYear() - dtcad.getFullYear()
    }
    function close() {
        const modalElement = document.getElementById('modalCadastro');
        if (modalElement) {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            bootstrapModal.hide();
        }
    }
    /*--------------------------------------------------------------------------------------*/
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    const isValidCpf = (cpf) => {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
        let check1 = (sum * 10) % 11;
        check1 = check1 === 10 ? 0 : check1;

        if (check1 !== parseInt(cpf[9])) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
        let check2 = (sum * 10) % 11;
        check2 = check2 === 10 ? 0 : check2;

        return check2 === parseInt(cpf[10]);
    };
    const isValidPassword = (senha) => {
        return senha.length >= 6;
    };
    async function checkUnique(validationErrors){
        let obj = {name:cadastroNome.trim(),email:cadastroEmail.trim()}
        //console.log("here--------------------------")
        try{
            //console.log("selected role id "+selectedRole)
            if (selectedRole === 'admin'){
                obj.cpf = cadastroCpf
            }else{
                obj = {name:cadastroNome.trim(),email:cadastroEmail.trim()}
                //(cpf,...obj) = obj
            }
            //console.log("the object is ")
            //console.log(obj)
            let result = await fetch("http://localhost:3000/user/ckUnique", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then((e) => e.json())
            //console.log(result)
            Object.keys(result).forEach((el)=>{
                if(result[el]){
                    validationErrors[el]=`${el} já cadastrado`
                }
            })
            //console.log(validationErrors)
            return validationErrors
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="modal fade" id="modalCadastro" tabIndex="-1" aria-labelledby="modalCadastroLabel" aria-hidden="true">
            <div className="modal-dialog modal-login modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>

                        <h6 className="modal-title" id="modalCadastroLabel">Cadastro</h6>

                        <form onSubmit={handleCadastroSubmit}>
                            <div className="item-input-user mb-3">
                                <label>Tipo de Cadastro:</label>

                                <div className="btn-group" role="group" aria-label="Tipo de Cadastro">
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="cadastroTipo"
                                        id="radioPaciente"
                                        value="user"
                                        checked={selectedRole === 'user'}
                                        onChange={() => setSelectedRole('user')}
                                        autoComplete="off"
                                    />
                                    <label className={`btn btn-outline-primary ${selectedRole === 'user' ? 'active' : ''}`} htmlFor="radioPaciente">
                                        Usuário
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="cadastroTipo"
                                        id="radioMedico"
                                        value="admin"
                                        checked={selectedRole === 'admin'}
                                        onChange={() => setSelectedRole('admin')}
                                        autoComplete="off"
                                    />
                                    <label className={`btn btn-outline-primary ${selectedRole === 'admin' ? 'active' : ''}`} htmlFor="radioMedico">
                                        Admin
                                    </label>
                                </div>
                            </div>

                            {/* Campos Comuns */}
                            <div className="item-input mb-3">
                                <label htmlFor="cadastroNome">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cadastroNome"
                                    placeholder="Digite seu nome completo"
                                    value={cadastroNome}
                                    onChange={(e) => setCadastroNome(e.target.value)}
                                    required
                                    disabled={cadastroLoading}
                                />
                                {errors.name && <p>{errors.name}</p>}
                            </div>

                            <div className="item-input mb-3">
                                <label htmlFor="cadastroEmail">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="cadastroEmail"
                                    placeholder="Digite seu email"
                                    value={cadastroEmail}
                                    onChange={(e) => setCadastroEmail(e.target.value)}
                                    required
                                    disabled={cadastroLoading}
                                />
                                {errors.email && <p>{errors.email}</p>}
                            </div>

                            {/*
                            <div className="item-input mb-3">
                                <label htmlFor="cadastroCpf">CPF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cadastroCpf"
                                    placeholder="000.000.000-00"
                                    value={cadastroCpf}
                                    onChange={handleCpfChange}
                                    required
                                    disabled={cadastroLoading}
                                    maxLength="14"
                                />
                            </div>
                            */}

                            {/* Campos para Médico (Admin) */}
                            {selectedRole === 'admin' && (
                                <>
                                    <div className="item-input mb-3">
                                        <label htmlFor="cadastroCpf">CPF</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cadastroCpf"
                                            placeholder="000.000.000-00"
                                            value={cadastroCpf}
                                            onChange={handleCpfChange}
                                            required
                                            disabled={cadastroLoading}
                                            maxLength="14"
                                        />
                                        {errors.cpf && <p>{errors.cpf}</p>}
                                    </div>

                                    <div className="item-input mb-3">
                                        <label htmlFor="specialty">Especialidade</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="specialty"
                                            placeholder="Ex: Cardiologia"
                                            value={specialty}
                                            onChange={(e) => setSpecialty(e.target.value)}
                                            required
                                            disabled={cadastroLoading}
                                        />
                                        {errors.specialty && <p>{errors.specialty}</p>}
                                    </div>

                                    <div className="item-input mb-3">
                                        <label htmlFor="presentation">Apresentação</label>
                                        <textarea
                                            className="form-control"
                                            id="presentation"
                                            rows="2"
                                            placeholder="Uma breve apresentação sobre você"
                                            value={presentation}
                                            onChange={(e) => setPresentation(e.target.value)}
                                            required
                                            disabled={cadastroLoading}
                                        ></textarea>
                                        {errors.presentation && <p>{errors.presentation}</p>}
                                    </div>
                                </>
                            )}

                            {/* Data de Nascimento (Paciente) */}
                            {selectedRole === 'user' && (
                                <div className="item-input mb-3">
                                    <label htmlFor="cadastroData">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="cadastroData"
                                        value={cadastroData}
                                        onChange={(e) => setCadastroData(e.target.value)}
                                        required
                                        disabled={cadastroLoading}
                                    />
                                    {errors.data && <p>{errors.data}</p>}
                                </div>
                            )}

                            {/* Upload de Imagem */}
                            {/*
                            {(selectedRole === 'user' || selectedRole === 'admin') && (
                                <div className="item-input mb-3">
                                    <label htmlFor={imageInputId}>{imageInputLabel}</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id={imageInputId}
                                        accept="image/*"
                                        ref={imageInputRef}
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                        required
                                        disabled={cadastroLoading}
                                    />
                                </div>
                            )}

                            {imagePreview && (
                                <div className="image-preview-container mb-3">
                                    <button type="button" className="btn-remove-image" onClick={handleRemoveImage} title="Remover Imagem">
                                        &times;
                                    </button>
                                    <img src={imagePreview} alt="Pré-visualização" className="image-preview" />
                                </div>
                            )}
                            */}

                            <div className="item-input password mb-3">
                                <label htmlFor="cadastroSenha">Senha</label>
                                <div style={{width: '100%',display:"flex",position:"relative"}}>
                                <input
                                    type={showPasswordStates.cadastroSenha ? 'text' : 'password'}
                                    className="form-control"
                                    id="cadastroSenha"
                                    placeholder="Crie uma senha"
                                    value={cadastroSenha}
                                    onChange={(e) => setCadastroSenha(e.target.value)}
                                    required
                                    disabled={cadastroLoading}
                                />
                                <button className="show-password" type="button" onClick={() => togglePasswordVisibility('cadastroSenha')}>
                                    {showPasswordStates.cadastroSenha ?
                                        (<i className="fa-solid fa-eye-slash"></i>) :
                                        (<i className="fa-solid fa-eye"></i>)
                                    }
                                </button>
                                </div>
                                {errors.senha && <p>{errors.senha}</p>}
                                
                            </div>

                            <div className="item-input password mb-3">
                                <label htmlFor="confirmarSenha">Confirmar senha</label>
                                <div style={{width: '100%',display:"flex",position:"relative"}}>
                                <input
                                    type={showPasswordStates.confirmarSenha ? 'text' : 'password'}
                                    className="form-control"
                                    id="confirmarSenha"
                                    placeholder="Repita a senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                    disabled={cadastroLoading}
                                />
                                <button className="show-password" type="button" onClick={() => togglePasswordVisibility('confirmarSenha')}>
                                    {showPasswordStates.confirmarSenha ?
                                        (<i className="fa-solid fa-eye-slash"></i>) :
                                        (<i className="fa-solid fa-eye"></i>)
                                    }
                                </button>
                                </div>
                                {errors.confirmarSenha && <p>{errors.confirmarSenha}</p>}
                                
                            </div>

                            <button type="submit" className="btn-default" disabled={cadastroLoading} /*onClick={() => submitFunction()}*/>
                                {cadastroLoading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </form>

                        <div className="footer-login">
                            <span>
                                Já tem uma conta?
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

export default RegisterModal;