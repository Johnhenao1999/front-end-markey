import { NavLink } from "react-router-dom";
import { useState } from "react";
import './menuVertical.css'

import imagesBarNav from './script';

const CompNavegacionVertical = () => {

    const toggleSidebar = () => {
        document.body.classList.toggle("open");
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(null);

    const resetSidebar = () => {
        setActiveNavItem(null);
    };

    const handleHeaderClicked = (navItem) => {
        if (activeNavItem === navItem) {
            resetSidebar();
        } else {
            setActiveNavItem(navItem);
        }
        setIsExpanded(!isExpanded);
    };


    return (
        <aside>
            <button type="button" class="cmp-sidebar-burger" onClick={toggleSidebar}></button>
            <div class="cmp-sidebar-toolbar">
                <nav>
                    <NavLink to="/homeAdministrador">
                        <button type="button">
                            <img src={imagesBarNav.iconoHome} />
                        </button>
                    </NavLink>
                    <button type="button">
                        <img src={imagesBarNav.iconSettings} />
                    </button>
                    <button type="button">
                        <img src={imagesBarNav.iconFolders} />
                    </button>
                </nav>
            </div>
            <div class="cmp-sidebar-nav">
                <nav>
                    <NavLink className="cmp-sidebar-custom-link" onClick={() => handleHeaderClicked('empleados')}>
                        <button type="button">
                            <img src={imagesBarNav.iconTest} />
                            <span className="cmp-sidebar-text-item">Empleados</span>
                            <span className={`material-symbols-outlined cmp-sidebar-text-item ${activeNavItem === 'empleados' ? 'active' : ''}`}>
                                expand_more
                            </span>
                        </button>
                    </NavLink>

                    <div
                        className={`subnav ${activeNavItem === 'empleados' ? 'active' : ''}`}
                        style={{ height: activeNavItem === 'empleados' ? '120px' : '0' }}>
                        <div className="cmp-sidebar-subnav-inner">
                            <NavLink to="/empleados" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Ver empleados</span>
                                </button>
                            </NavLink>

                            <NavLink to="/create-employees" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Crear empleado</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <NavLink className="cmp-sidebar-custom-link" onClick={() => handleHeaderClicked('clientes')}>
                        <button type="button">
                            <img src={imagesBarNav.iconTest} />
                            <span className="cmp-sidebar-text-item">Clientes</span>
                            <span className={`material-symbols-outlined cmp-sidebar-text-item ${activeNavItem === 'clientes' ? 'active' : ''}`}>
                                expand_more
                            </span>
                        </button>
                    </NavLink>

                    <div
                        className={`subnav ${activeNavItem === 'clientes' ? 'active' : ''}`}
                        style={{ height: activeNavItem === 'clientes' ? '120px' : '0' }}>
                        <div className="cmp-sidebar-subnav-inner">
                            <NavLink to="/clientes" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Ver clientes</span>
                                </button>
                            </NavLink>

                            <NavLink to="/crear-cliente" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Crear cliente</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <NavLink className="cmp-sidebar-custom-link" onClick={() => handleHeaderClicked('pedidos')}>
                        <button type="button">
                            <img src={imagesBarNav.iconTest} />
                            <span className="cmp-sidebar-text-item">Pedidos</span>
                            <span className={`material-symbols-outlined cmp-sidebar-text-item ${activeNavItem === 'pedidos' ? 'active' : ''}`}>
                                expand_more
                            </span>
                        </button>
                    </NavLink>

                    <div
                        className={`subnav ${activeNavItem === 'pedidos' ? 'active' : ''}`}
                        style={{ height: activeNavItem === 'pedidos' ? '120px' : '0' }}>
                        <div className="cmp-sidebar-subnav-inner">
                            <NavLink to="/pedidos-activos" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Pedidos activos</span>
                                </button>
                            </NavLink>

                            <NavLink to="/pedidos-finalizados" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Pedidos finalizados</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <NavLink className="cmp-sidebar-custom-link" onClick={() => handleHeaderClicked('proveedores')}>
                        <button type="button">
                            <img src={imagesBarNav.iconTest} />
                            <span className="cmp-sidebar-text-item">Proveedores</span>
                            <span className={`material-symbols-outlined cmp-sidebar-text-item ${activeNavItem === 'proveedores' ? 'active' : ''}`}>
                                expand_more
                            </span>
                        </button>
                    </NavLink>

                    <div
                        className={`subnav ${activeNavItem === 'proveedores' ? 'active' : ''}`}
                        style={{ height: activeNavItem === 'proveedores' ? '120px' : '0' }}>
                        <div className="cmp-sidebar-subnav-inner">
                            <NavLink to="/proveedores" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Ver proveedores</span>
                                </button>
                            </NavLink>

                            <NavLink to="/create-proveedores" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Crear proveedor</span>
                                </button>
                            </NavLink>
                        </div>
                    </div>


                    <NavLink className="cmp-sidebar-custom-link" onClick={() => handleHeaderClicked('inventario')}>
                        <button type="button">
                            <img src={imagesBarNav.iconTest} />
                            <span className="cmp-sidebar-text-item">Inventario</span>
                            <span className={`material-symbols-outlined cmp-sidebar-text-item ${activeNavItem === 'proveedores' ? 'active' : ''}`}>
                                expand_more
                            </span>
                        </button>
                    </NavLink>

                    <div
                        className={`subnav ${activeNavItem === 'inventario' ? 'active' : ''}`}
                        style={{ height: activeNavItem === 'inventario' ? '300px' : '0' }}>
                        <div className="cmp-sidebar-subnav-inner">
                            <NavLink to="/maquinaria" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Maquinaria</span>
                                </button>
                            </NavLink>

                            <NavLink to="/insumos" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Insumos</span>
                                </button>
                            </NavLink>

                            <NavLink to="/telas" className="cmp-sidebar-custom-link">
                                <button type="button">
                                    <span className="cmp-sidebar-text-item">Telas</span>
                                </button>
                            </NavLink>

                        </div>
                    </div>

                </nav>
            </div>
        </aside>
    );
};

export default CompNavegacionVertical;