/* import { Link } from "react-router-dom";
import { useState } from "react";
import './menuVertical.css'

const CompNavegacionVertical = () => {
    const [showPedidoOptions, setShowPedidoOptions] = useState(false);

    const handlePedidoMouseEnter = () => {
        setShowPedidoOptions(true);
    };

    const handlePedidoMouseLeave = () => {
        setShowPedidoOptions(false);
    };

    return (
        <div>
            <nav className="cmp-markey-container-menu-vertical">
                <ul>
                    <li><Link to="/empleados">Empleados</Link></li>
                    <li><Link to="/clientes">Clientes</Link></li>
                    <li>
                        <div onMouseEnter={handlePedidoMouseEnter} onMouseLeave={handlePedidoMouseLeave}>
                            <Link to="#">Pedidos</Link>
                            {showPedidoOptions && (
                                <ul>
                                    <li><Link to="/pedidos">Ver todos los pedidos</Link></li>
                                </ul>
                            )}
                        </div>
                    </li>
                    <li><Link to="/proveedores">Proveedores</Link></li>
                    <li><Link to="/inventario">Inventario</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default CompNavegacionVertical; */

/* import { NavLink } from "react-router-dom";
import './menuVertical.css'

const CompNavegacionVertical = () => {

    return (
        <div>
            <nav className="cmp-markey-container-menu-vertical">
                <ul>
                    <li><NavLink to="/empleados" activeClassName="active">Empleados</NavLink></li>
                    <li><NavLink to="/clientes" activeClassName="active">Clientes</NavLink></li>
                    <li>
                        <NavLink to="/pedidos" activeClassName="active">
                            Pedidos
                        </NavLink>
                        <ul>
                            <li><NavLink to="/pedidos" activeClassName="active">Ver todos los pedidos</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to="/proveedores" activeClassName="active">Proveedores</NavLink></li>
                    <li><NavLink to="/inventario" activeClassName="active">Inventario</NavLink></li>

                </ul>
            </nav>
        </div>
    )

}

export default CompNavegacionVertical; */

import { NavLink } from "react-router-dom";
import { useState } from "react";
import './menuVertical.css'

const CompNavegacionVertical = () => {
    const [showPedidoOptions, setShowPedidoOptions] = useState(false);
    const [showAllPedidos, setShowAllPedidos] = useState(false);

    const handlePedidoMouseEnter = () => {
        setShowPedidoOptions(true);
    };

    const handlePedidoMouseLeave = () => {
        setShowPedidoOptions(false);
    };

    const handleShowAllPedidosClick = () => {
        setShowAllPedidos(true);
    };

    return (
        <div>
            <nav className="cmp-markey-container-menu-vertical">
                <ul>
                    <li><NavLink to="/empleados" activeClassName="active">Empleados</NavLink></li>
                    <li><NavLink to="/clientes" activeClassName="active">Clientes</NavLink></li>
                    <li onMouseEnter={handlePedidoMouseEnter} onMouseLeave={handlePedidoMouseLeave}>
                        <NavLink to="/pedidos" activeClassName="active">
                            Pedidos
                        </NavLink>
                        {showPedidoOptions && (
                            <ul>
                                <li>
                                    <NavLink to="/pedidos-activos" activeClassName={showAllPedidos ? "active" : ""} onClick={handleShowAllPedidosClick}>
                                        Pedidos activos
                                    </NavLink>
                                    <NavLink to="/pedidos-finalizados" activeClassName={showAllPedidos ? "active" : ""} onClick={handleShowAllPedidosClick}>
                                        Pedidos finalizados
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><NavLink to="/proveedores" activeClassName="active">Proveedores</NavLink></li>
                    <li><NavLink to="/inventario" activeClassName="active">Inventario</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default CompNavegacionVertical;