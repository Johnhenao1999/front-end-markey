/* import { dividerClasses } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './homePrincipal.css'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";




const CompHomePrincipal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [open, setOpen] = useState(false);

    const handleLogin = () => {


        if (!username) {
            setUsernameError('El campo de usuario es obligatorio');
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('El campo de contraseña es obligatorio');
        } else {
            setPasswordError('');
        }

        if (!username || !password) {
            return;
        }

        if (username === "admin" && password === "admin") {
            // redireccionar a otra ruta
            window.location.href = "/homeAdministrador";
        } else {
            setOpen(true);
        }
    };

    return (
        <div className="container-login-markey">
            <div className="login-container">
                <div className="login-card">
                    <h2>Welcome</h2>
                    <div className="cmp-container-input-login">
                        <input
                            type="text"
                            id="username"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <div className="error">{usernameError}</div>}

                        <input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="error">{passwordError}</div>}

                        <button onClick={handleLogin} className="btn-iniciar-sesion">Iniciar sesión</button>
                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Error de inicio de sesión</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Usuario o contraseña incorrectos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CompHomePrincipal; */

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './homePrincipal.css'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

//Imports assets
import logo from '../assets/logo.png';
import bgWaves from '../assets/wave.png';
import imgDecor from '../assets/im1.svg';

const CompHomePrincipal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    if (!username) {
      setUsernameError('El campo de usuario es obligatorio');
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('El campo de contraseña es obligatorio');
    } else {
      setPasswordError('');
    }

    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login/', { username, password });
      if (response.status === 200) {
        // redireccionar a otra ruta
        window.location.href = "/empleados";
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  return (
    <div className="container-login-markey">
      <img class="cmp-loggin-bg-wave" src={bgWaves}></img>
      <div className="cmp-loggin-container">
        <div className="imgDecor">
          <img src={ imgDecor }></img>
        </div>
        <div className="login-content">
          <div className="content">
            <img src={ logo } alt="" />
            <h2 class="title">Bienvenido</h2>
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" onClick={handleLogin} className="cmp-loggin-btn" value="Login"></input>
          </div>
        </div>
      </div>
      {/* <div className="login-container">
        <div className="login-card">
          <h2>Welcome</h2>
          <div className="cmp-container-input-login">
            <input
              type="text"
              id="username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <div className="error">{usernameError}</div>}

            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="error">{passwordError}</div>}

            <button onClick={handleLogin} className="btn-iniciar-sesion">Iniciar sesión</button>
          </div>
        </div>
      </div> */}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Error de inicio de sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Usuario o contraseña incorrectos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompHomePrincipal;