import React, { useState } from 'react'
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from 'react-toastify';
import { validateEmail } from '../../../utils/Validations';

import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./LoginForm.scss";

export default function LoginForm(props) {
    const { setSelectedForm } = props;

    const [formLogin, setformLogin] = useState(defaultFormLogin);
    const onChange = (e) => {
        setformLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        });
    }

    const [showPassword, setshowPassword] = useState(false)
    const handlerShowPassword = () => {
        setshowPassword(!showPassword);
    }

    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [user, setUser] = useState(null);

    const onSubmit = () => {
        setFormError({});
        let errors = {};
        let formValid = true;

        if (!validateEmail(formLogin.email)) {
            errors.email = true;
            formValid = false;
        }
        if (!formLogin.password || formLogin.password.length < 6) {
            errors.password = true;
            formValid = false;
        }
        setFormError(errors);

        if (formValid) {
            setIsLoading(true);

            firebase.auth().signInWithEmailAndPassword(formLogin.email, formLogin.password)
                .then((response) => {
                    setUser(response.user);
                    setUserActive(response.user.emailVerified);

                    if (!response.user.emailVerified) {
                        toast.warning('Para poder ingresar primero debes verificar tu cuenta');
                    }

                }).catch((err) => {
                    handlerError(err.code);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }


    return (
        <div className="login-form">
            <h1>Musica para todos.</h1>

            <Form onSubmit={onSubmit} onChange={onChange}>

                <Form.Field>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Corre electronico"
                        icon="mail outline"
                        error={formError.email}>
                    </Input>
                    {formError.email && (
                        <span className="error-text">
                            Por favor, introduce un correo electronico valido.
                        </span>
                    )}
                </Form.Field>

                <Form.Field>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="*********"
                        icon={
                            showPassword ?
                                (
                                    <Icon
                                        name="eye slash outline"
                                        link
                                        onClick={handlerShowPassword}>
                                    </Icon>
                                ) :
                                (
                                    <Icon
                                        name="eye"
                                        link
                                        onClick={handlerShowPassword}>
                                    </Icon>
                                )
                        }
                        error={formError.password}>
                    </Input>
                    {formError.password && (
                        <span className="error-text">
                            Por favor, ingresa una contraseña valida.
                        </span>
                    )}
                </Form.Field>

                <Button
                    type="submit"
                    loading={isLoading}>
                    Iniciar Sesion
                </Button>

                {!userActive && (
                    <ButtonSendEmailVerification
                        user={user}
                        setIsLoading={setIsLoading}
                        setUserActive={setUserActive}>
                    </ButtonSendEmailVerification>
                )}

                <div className="login-form__options">
                    <p onClick={() => setSelectedForm(null)}>
                        Volver
                    </p>
                    <p>
                        ¿Aun no tienes cuenta?
                    <span onClick={() => setSelectedForm('register')}>Registrate aqui</span>
                    </p>
                </div>

            </Form>
        </div>
    )
}

function ButtonSendEmailVerification(porps) {
    const { user, setIsLoading, setUserActive } = porps;

    const resendVerificationEmail = () => {
        user.sendEmailVerification().then(() => {
            toast.success('Se ha enviando el email de verificacion');
        }).catch((err) => {
            // Error...
            handlerError(err.code);
        }).finally(() => {
            setIsLoading(false);
            setUserActive(true);
        })
    }

    return (
        <div className="resend-verification-email">
            <p>
                Si no has recibido el email de verificacion puedes volver a enviarlo
                haciendo click <span onClick={resendVerificationEmail}>aqui.</span>
            </p>
        </div>
    );
}

function handlerError(code) {
    switch (code) {
        case 'auth/wrong-password':
            toast.warning('El usuario o la contraseña son incorrectos');
            break;

        case 'auth/too-many-requests':
            toast.warning('Has enviando demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo');
            break;

        case 'auth/user-not-found':
            toast.warning('Lo sentimos el usuario no existe');
            break;

        default:
            toast.warning('Ha ocurrido un error');
            break;
    }
}

function defaultFormLogin() {
    return {
        email: "",
        password: ""
    }
}