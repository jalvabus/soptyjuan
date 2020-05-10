import React from 'react'
import { Button } from 'semantic-ui-react';

import "./AuthOptions.scss";

export default function AuthOptions(props) {
    const { setSelectedForm } = props;

    return (
        <div className="auth-options">
            <h2>Millones de canciones para ti</h2>
            <Button onClick={() => setSelectedForm("register")} className="register">
                Registrarse gratis
            </Button>
            <Button onClick={() => setSelectedForm("login")} className="login">
                Iniciar sesion
            </Button>
        </div>
    );
}
