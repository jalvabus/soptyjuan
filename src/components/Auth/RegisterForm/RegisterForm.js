import React, { useState } from 'react'
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { validateEmail } from '../../../utils/Validations';

import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./RegisterForm.scss";

import { toast } from 'react-toastify';

export default function RegisterForm(props) {
    const { setSelectedForm } = props;

    const [formData, setformData] = useState(defaultValueForm);

    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setFormError({});
        let errors = {};
        let formValid = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formValid = false;
        }
        if (formData.password.length < 6) {
            errors.password = true;
            formValid = false;
        }
        if (!formData.username) {
            errors.username = true;
            formValid = false;
        }

        setFormError(errors);

        if (formValid) {
            console.log('Formulario valido');
            setIsLoading(true);

            firebase.auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then((registeredUser) => {
                    console.log('registeredUser');

                    changeUserName();

                    responseVerificationEmail();

                })
                .catch((err) => {
                    console.error('registeredUser err', err);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            toast.error("Error al crear la cuenta !");
            console.log('Formulario invalido', errors);
        }
    }

    const changeUserName = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: formData.username
        })
            .catch((err) => {
                toast.error("Error al actualizar los datos del usuario !");
            })
    }

    const responseVerificationEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then((responseVerificationEmail) => {
            console.log('responseVerificationEmail ', responseVerificationEmail);
            toast.success("Se ah enviando un email de verificacion !");
        }).catch((err) => {
            toast.error("Error al enviar el correo de verificacion !");
        })
    }

    const onChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const [showPassword, setshowPassword] = useState(false)
    const handlerShowPassword = () => {
        setshowPassword(!showPassword);
    }
    return (
        <div className="register-form">
            <h1>Empieza a escuchar mi musica</h1>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Correo electronico"
                        icon="mail outline"
                        error={formError.email}
                    >
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
                        error={formError.password}
                    // onChange={}
                    >
                    </Input>
                    {formError.password && (
                        <span className="error-text">
                            Elige una contraseña superior a 5 caracteres.
                        </span>
                    )}
                </Form.Field>

                <Form.Field>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Escribe tu nombre de usuario"
                        icon="user circle outline"
                        // onChange={}
                        error={formError.username}
                    >
                    </Input>
                    {formError.username && (
                        <span className="error-text">
                            Por favor introduce un nombre.
                        </span>
                    )}
                </Form.Field>

                <Button type="submit" loading={isLoading}>
                    Continuar
                </Button>
            </Form>

            <div className="register-form__options">
                <p onClick={() => setSelectedForm(null)}>
                    Volver
                </p>
                <p>
                    Ya tienes spotyjuan
                    <span onClick={() => setSelectedForm('login')}>Iniciar sesion</span>
                </p>
            </div>
        </div >
    )
}

function defaultValueForm() {
    return {
        email: "",
        password: "",
        username: ""
    }
}