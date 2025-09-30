import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 
import './HomeContent.css';

import imgPersonagem from '../../../assets/image/personagem.png';
import imgAprendizado from '../../../assets/image/bloco-de-brinquedo.png';
import imgDesenvolvimento from '../../../assets/image/aprendendo.png';
import imgAcompanhamento from '../../../assets/image/pai-e-filho.png';
import imgSobre from '../../../assets/image/personagem2.png';
import imgPessoa1 from '../../../assets/image/pessoa-1.jpg';
import imgPessoa2 from '../../../assets/image/pessoa-2.jpg';
import imgPessoa3 from '../../../assets/image/pessoa-3.jpg';
import imgPessoa4 from '../../../assets/image/pessoa-4.jpg';
import imgPessoa5 from '../../../assets/image/pessoa-5.jpg';
import imgPessoa6 from '../../../assets/image/pessoa-6.jpg';
import imgPessoa7 from '../../../assets/image/pessoa-7.jpg';
import imgPessoa8 from '../../../assets/image/pessoa-8.jpg';
import imgFaq from '../../../assets/image/personagem3.png';
import imgContato from '../../../assets/image/personagem4.png';

const HomeContent = () => {
    // Estado simples para o Formulário de Contato (Front-end puro)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    // Apenas simula o envio do formulário, sem chamar a API.
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulação de Validação Front-end
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }
        
        setLoading(true);
        console.log('Dados do Contato para Envio (Simulado):', { nome, email, mensagem });

        // Simula o tempo de envio e reseta o formulário
        setTimeout(() => {
            alert(`Obrigado, ${nome}! Sua mensagem foi capturada. (Simulação)`);
            setNome('');
            setEmail('');
            setMensagem('');
            setLoading(false);
        }, 1500); 
    };

    return (
        <main className="main-home">
            <section className="section-main">
                <div className="title-main">
                    <h1>Transforme o aprendizado em aventura com a nossa Plataforma de Jogos Educativos!</h1>
                    <p>Nosso sistema promove o desenvolvimento de habilidades essenciais através de jogos interativos e desafiadores, garantindo um aprendizado sólido e divertido.</p>
                </div>
                <img src={imgPersonagem} className="img-main" alt="Imagem Personagem" width="400px" height="auto" />
            </section>

            <section className="section-quality">
                <div className="item-quality">
                    <div className="img-quality">
                        <img src={imgAprendizado} alt="Imagem Aprendizado Divertido" width="80px" height="auto" />
                    </div>

                    <h5>
                        Aprendizado <br></br>
                        Divertido
                    </h5>

                    <p>Transforme o dever de casa em diversão. Nossos jogos são criados para manter o alto engajamento da criança, garantindo que o reforço escolar de Português e Matemática seja leve e eficaz.</p>
                </div>

                <div className="item-quality">
                    <div className="img-quality">
                        <img src={imgDesenvolvimento} alt="Imagem Desenvolvimento Essencial" width="80px" height="auto" />
                    </div>

                    <h5>
                        Desenvolvimento <br></br>
                        Essencial
                    </h5>

                    <p>Focamos em competências básicas de alfabetização e raciocínio lógico. A criança avança no próprio ritmo, construindo uma base sólida para o sucesso nas próximas etapas escolares.</p>
                </div>

                <div className="item-quality">
                    <div className="img-quality">
                        <img src={imgAcompanhamento} alt="Imagem Acompanhamento" width="80px" height="auto" />
                    </div>

                    <h5>
                        Acompanhamento <br></br>
                        Simples
                    </h5>

                    <p>Monitore o progresso do seu filho de forma intuitiva. Você terá acesso fácil a relatórios de desempenho e saberá exatamente onde ele precisa de mais atenção.</p>
                </div>
            </section>

            <div className="div-separator"></div>

            <section className="section-about" id="sobre">
                <div className="area-img">
                    <img src={imgSobre} alt="Imagem Sobre" width="650px" height="auto" />
                </div>
                <div>
                    <h6 className="tag-section">Sobre a Plataforma</h6>
                    <h2>O que é o <strong>Educa Simples?</strong> </h2>
                    <p>
                        O <strong>Educa Simples</strong> é uma plataforma web de jogos educativos, criada para reforçar o conhecimento básico de crianças na fase de alfabetização e consolidação de conteúdo.
                        <br></br>
                        Nosso objetivo principal é tornar o estudo de Língua Portuguesa e Matemática Básica uma experiência divertida e eficaz, complementando o aprendizado escolar.
                        <br></br>
                        Na plataforma, as crianças podem praticar exercícios de forma simples e prática, garantindo uma base sólida para o futuro e ajudando no desenvolvendo de habilidades essenciais com diversão.
                    </p>
                </div>
            </section>

            <div className="div-separator"></div>

            <section className="section-depoiments" id="depoimentos">
                <h6 className="tag-section">Depoimentos</h6>

                <h2>
                    O que os clientes dizem
                    <br></br>
                    sobre nosso sistema
                </h2>

                <Splide
                    options={{
                        type: 'loop',
                        perPage: 3,
                        perMove: 1,
                        autoplay: true,
                        interval: 3000,
                        gap: '1rem',
                        breakpoints: {
                            900: {
                                perPage: 2,
                                interval: 5000
                            },
                            600: {
                                perPage: 1,
                            }
                        }
                    }}
                    aria-label="Carrossel de Depoimentos" tag="section" id="splide-depoimentos">

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa1})` }}>
                            </div>

                            <p className="name-depoiment">
                                Maria Eduarda
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa2})` }}>
                            </div>

                            <p className="name-depoiment">
                                João Pedro
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa3})` }}>
                            </div>

                            <p className="name-depoiment">
                                Ana Clara
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa4})` }}>
                            </div>

                            <p className="name-depoiment">
                                Lucas Gabriel
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa5})` }}>
                            </div>

                            <p className="name-depoiment">
                                Isabela Ferreira
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa6})` }}>
                            </div>

                            <p className="name-depoiment">
                                Rafael Rodrigues
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa7})` }}>
                            </div>

                            <p className="name-depoiment">
                                Beatriz Pereira
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>

                    <SplideSlide>
                        <div className="item-depoiment">
                            <div className="area-img" style={{ backgroundImage: `url(${imgPessoa8})` }}>
                            </div>

                            <p className="name-depoiment">
                                Guilherme Alves
                            </p>

                            <p className="desc-depoiment">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </SplideSlide>
                </Splide>
            </section>

            <div className="div-separator"></div>

            <section className="section-faq" id="faq">
                <h6 className="tag-section">FAQ - Perguntas Frequentes</h6>

                <h2>
                    Tire suas dúvidas sobre o
                    <br></br>
                    Agilidade na Saúde
                </h2>

                <div className="area-faq">
                    <div className="area-img">
                        <img src={imgFaq} alt="Imagem FAQ - Perguntas frequentes" width="100%" height="auto" />
                    </div>

                    <div className="accordion" id="accordionFaq">
                        <div className="accordion-item">
                            <h6 className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC?
                                </button>
                            </h6>

                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h6 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC?
                                </button>
                            </h6>

                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h6 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Where does it come from?
                                </button>
                            </h6>

                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>
                                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h6 className="accordion-header" id="headingFour">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    The standard Lorem Ipsum passage, used since the 1500s ?
                                </button>
                            </h6>

                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h6 className="accordion-header" id="headingFive">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    1914 translation by H. Rackham ?
                                </button>
                            </h6>

                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="div-separator"></div>

            <section className="section-contact" id="contato">
                <h6 className="tag-section">Área de Contato</h6>
                <h2>
                    Alguma sugestão ?
                    <br></br>
                    Envie-nos uma mensagem
                </h2>
                <div className="body-contact">
                    <div className="area-img">
                        <img src={imgContato} alt="Imagem Contato" width="650px" height="auto" />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="item-input-user mb-3">
                                <label>Nome</label>
                                <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </div>
                            <div className="item-input-user mb-3">
                                <label>Email</label>
                                <input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="item-input-user mb-3">
                                <label>Mensagem</label>
                                <textarea placeholder="Sua mensagem" rows={4} value={mensagem} onChange={(e) => setMensagem(e.target.value)} required></textarea>
                            </div>
                            
                            <button className="btn-default" type="submit" disabled={loading}>
                                {loading ? 'Enviando...' : 'Enviar Mensagem'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomeContent;