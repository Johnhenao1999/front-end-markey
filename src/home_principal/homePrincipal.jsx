import { dividerClasses } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './homePrincipal.css'


const URI = 'http://localhost:8000/holamundo/'


const CompHomePrincipal = () => {

    return (

        <div>
            <div id="topbar" class="fixed-top d-flex align-items-center ">
                <div class="container d-flex align-items-center justify-content-center justify-content-md-between">
                    <div class="contact-info d-flex align-items-center">
                        <i class="bi bi-envelope-fill"></i><a href="mailto:contact@example.com">mazda@mazdacontact.com</a>
                        <i class="bi bi-phone-fill phone-icon"></i> +57 5589 55488 55
                    </div>
                    <div class="cta d-none d-md-block">
                        <a href="#contact" class="scrollto">Contacta un asesor</a>
                    </div>
                </div>

                <a href="assets/img/publicidad-mazda.png" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link"><i class="bx bx-plus"></i></a>

            </div>
            <header id="header" class="fixed-top d-flex align-items-center">
                <div class="container d-flex align-items-center justify-content-between">

                    <h1 class="logo"><a href="index.html">Mazda</a></h1>
                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="#hero">INICIO</a></li>
                            <li><a class="nav-link scrollto " href="#portfolio">VEHÍCULOS</a></li>
                            <li><a class="nav-link scrollto" href="#about">SOBRE NOSOTROS</a></li>
                            <li><a class="nav-link scrollto" href="#services">SERVICIOS</a></li>
                            <li><a class="nav-link scrollto" href="#contact">CONTACTO</a></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>
            <section id="hero" class="d-flex justify-cntent-center align-items-center">
                <div id="heroCarousel" data-bs-interval="5000" class="container carousel carousel-fade" data-bs-ride="carousel">
                    <div class="carousel-item active">
                        <div class="carousel-container">
                            <h2 class="animate__animated animate__fadeInDown">Bienvenido a <span>Mazda</span></h2>
                            <p class="animate__animated animate__fadeInUp">En mazda fabricamos autos que hacen que la conducción importe. Es por eso que diseñamos cada Mazda para inspirar, emocionar y, sobre todo, para alegrar a la gente. Esta filosofía guía todo lo que hacemos. Desde la tecnología, hasta el diseño y la seguridad.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="carousel-container">
                            <h2 class="animate__animated animate__fadeInDown">Conoce nuestros Hibridos</h2>
                            <p class="animate__animated animate__fadeInUp">Nuestros motores e-Skyactiv G con el sistema Mazda Mild Hybrid producen menos emisiones de CO2 a la vez que logran un rendimiento excepcional y se complementan para respaldar la eficiencia y el rendimiento del vehículo en cada camino, dándote además de eficiencia superior, un importante ahorro de combustible.</p>
                        </div>
                    </div>
                </div>

                <div class="carousel-item">
                    <div class="carousel-container">
                        <h2 class="animate__animated animate__fadeInDown">Conoce la experiencia Mazda</h2>
                        <p class="animate__animated animate__fadeInUp">Visita nuestro blog, conoce las nuevas novedades en mazda y conoce la experiencia mazda de primera mano por parte de nuestros clientes.</p>
                    </div>
                </div>

                <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon bx bx-chevron-left" aria-hidden="true"></span>
                </a>
                <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon bx bx-chevron-right" aria-hidden="true"></span>
                </a>
            </section>
            <section id="about" class="about">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>Estamos trabajando activamente para mejorar siempre nuestros productos y a la vez estamos comprometidos en la búsqueda permanente de valores que mejoren tu experiencia y satisfacción. El perfecto funcionamiento de tu vehículo es nuestra prioridad.</p>
                    </div>

                    <div class="row content">
                        <div class="col-lg-6">
                            <p>
                                <b >Visión corporativa</b>
                                Nos encantan los autos y queremos que las personas disfruten de vidas plenas a través de los autos, visualizamos autos que existen de manera sostenible con la tierra y la sociedad y continuaremos enfrentando desafíos con ideas creativas.
                            </p>
                            <ul>
                                <li><i class="ri-check-double-line"></i> Mejorar la vida de las personas a través de la propiedad de un automóvil.</li>
                                <li><i class="ri-check-double-line"></i> Ofrecer autos sustentables con la tierra y la sociedad a más personas.</li>
                                <li><i class="ri-check-double-line"></i> Acepte los desafíos y busque dominar el Doh ("Camino" o "Camino") de la creatividad.</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 pt-4 pt-lg-0">
                            <p>
                                <b>Esencia de marca "Celebrar la conducción"</b>
                                La esencia de la marca Mazda es "Celebrar la conducción". “Celebrate Driving” ofrecido por Mazda no se trata solo de desempeño de conducción. Elegir un Mazda premia al propietario con confianza y orgullo. Conducir un Mazda que conduce a la urgencia de asumir nuevos retos. No solo nuestros productos, sino cada encuentro con Mazda evoca la emoción del movimiento y hace que el corazón de los clientes lata de emoción. Todo esto está contenido en nuestra esencia de marca de “Celebrate Driving”.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="why-us" class="why-us">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-lg-6 align-items-stretch position-relative video-box" data-aos="fade-right">
                            <img src="img/mazda1-banner.jpg" alt="" />
                        </div>
                        <div class="col-lg-6 align-items-stretch position-relative fondo">
                            <div class="section-title hibrid">
                                <h2>
                                    HÍBRIDOS MAZDA:
                                    EL BALANCE PERFECTO ENTRE DOS TECNOLOGÍAS: SKYACTIV Y MILD HYBRID
                                </h2>
                                <p>
                                    Nuestros motores e-Skyactiv G con el sistema Mazda Mild Hybrid producen menos emisiones de CO2 a la vez que logran un
                                    rendimiento excepcional y se complementan para respaldar la eficiencia
                                    y el rendimiento del vehículo en cada camino, dándote además de eficiencia superior, un importante ahorro de combustible.
                                </p>
                                <div class="hibrid">
                                    <button class="btn btn-outline-danger" type="button">Saber Mas</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section id="services" class="services">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2>SERVICIOS</h2>
                    </div>

                    <div class="row">
                        <div class="col-md-12 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                            <div class="icon-box">
                                <i class="bx bxs-wrench"></i>
                                <h4><a href="#">MANTENIMIENTOS Y SERVICIOS RÁPIDOS</a></h4>
                                <p>Para continuar disfrutando de una experiencia de manejo sin igual, es necesario realizar un mantenimiento periódicamente y reemplazar las partes que se van desgastando con el tiempo.</p>
                            </div>
                        </div>
                        <div class="col-md-12 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                            <div class="icon-box">
                                <i class='bx bxs-cog'></i>
                                <h4><a href="#">DIAGNÓSTICOS Y REPARACIONES ESPECIALIZADAS</a></h4>
                                <p>Nadie mejor que nuestros técnicos entrenados y certificados para diagnosticar y reparar los sistemas más complejos: reparaciones de motor, reparaciones de transmisión o reparaciones de dirección y suspensión, entre otras.</p>
                            </div>
                        </div>
                        <div class="col-md-12 d-flex align-items-stretch mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="300">
                            <div class="icon-box">
                                <i class='bx bxs-color-fill'></i>
                                <h4><a href="#">LÁMINA Y PINTURA</a></h4>
                                <p>Reparar las líneas y los colores que tan cuidadosamente fueron diseñados para dar vida a los vehículos, requiere de personal experto, técnicas y equipos especializados, capaces de ofrecerte la mejor calidad.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div class="col-lg-3 col-md-6 footer-links">
                                <h4>NAVEGACIÓN</h4>
                                <ul>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Inicio</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Sobre nosotros</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Servicios</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Terminos de servicio</a></li>
                                    <li><i class="bx bx-chevron-right"></i> <a href="#">Politicas de privacidad</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>

            <script src="/home_principal/main.js"></script>
        </div>
    )

}

export default CompHomePrincipal;