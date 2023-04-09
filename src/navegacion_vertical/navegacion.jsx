import { NavLink } from "react-router-dom";
import { useState } from "react";
import './menuVertical.css'

import imagesBarNav from './script';

const CompNavegacionVertical = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        document.body.classList.toggle("open");
    };

    const [activeSubNav, setActiveSubNav] = useState('');

    const resetSidebar = () => {
        setActiveSubNav('');
    };

    const handleHeaderClicked = (subNav) => {
        setIsExpanded(!isExpanded);
        if (subNav === activeSubNav) {
        resetSidebar();
        return;
        }

        resetSidebar();
        setActiveSubNav(subNav);
    };

    return (
        <aside>
            <button type="button" class="cmp-sidebar-burger" onClick={ toggleSidebar }></button>
            <div class="cmp-sidebar-toolbar">
                <nav>
                    <button type="button">
                        <img src={ imagesBarNav.iconoHome } />
                    </button>
                    <button type="button">
                        <img src={ imagesBarNav.iconSettings } />
                    </button>
                    <button type="button">
                        <img src={ imagesBarNav.iconFolders } />
                    </button>
                </nav>
            </div>
            <div class="cmp-sidebar-nav">
                <nav>
                    <NavLink to="/empleados" className="cmp-sidebar-custom-link">
                        <button type="button" to="/empleados">
                            <img src={ imagesBarNav.iconTest } />
                            <span className="cmp-sidebar-text-item">Empleados</span>
                        </button>
                    </NavLink>

                    <NavLink to="/clientes" className="cmp-sidebar-custom-link">
                        <button type="button">
                            <img src={ imagesBarNav.iconTest } />
                            <span className="cmp-sidebar-text-item">Clientes</span>
                        </button>
                    </NavLink>

                    <NavLink className="cmp-sidebar-custom-link" onClick={() => handleHeaderClicked('pedidos')}>    
                        <button type="button">
                            <img src={ imagesBarNav.iconTest } />
                            <span className="cmp-sidebar-text-item">Pedidos</span>
                            <span className={`material-symbols-outlined cmp-sidebar-text-item ${isExpanded ? 'active' : ''}`}>
                                expand_more
                            </span>
                        </button>
                    </NavLink>

                    <div 
                        id="pedidos" className={`subnav ${activeSubNav === 'pedidos' ? 'active' : ''}`}
                        style={{ height: activeSubNav === 'pedidos' ? '120px' : '0' }}>
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

                    <NavLink to="/proveedores" className="cmp-sidebar-custom-link">
                        <button type="button">
                            <img src={ imagesBarNav.iconTest } />
                            <span className="cmp-sidebar-text-item">Proveedores</span>
                        </button>
                    </NavLink>

                    <NavLink to="/inventario" className="cmp-sidebar-custom-link">
                        <button type="button">
                            <img src={ imagesBarNav.iconTest } />
                            <span className="cmp-sidebar-text-item">Inventario</span>
                        </button>
                    </NavLink>

                </nav>
            </div>
        </aside>
    );
};

export default CompNavegacionVertical;