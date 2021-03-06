import "./style.css";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Authentication from '../Authentication';
import { Input, Button } from "semantic-ui-react";
import { notify } from "react-notify-toast";
function Register() {
    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            nome: values.nome,
            email: values.email,
            password: values.password
        }).then((Response) => {
            notify.show(Response.data.msg);
        });
    };

    //faz a validação dos campos do cadastro
    const validationCadastro = yup.object().shape({
        nome: yup
            .string()
            .required("Campo Nome obrigatório"),
        email: yup
            .string()
            .email("Formato inválido.")
            .required("Campo E-mail obrigatório"),
        password: yup
            .string()
            .min(8, "Formato de senha inválido")
            .required("Campo Senha obrigatório."),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "A combinação de senhas não bate."),
    });

    return <Authentication>
        <h1>Cadastro</h1>
        <Formik initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationCadastro}>
            <Form className="login-form">
                <div className="login-form-group">
                    <Field as={Input} size="large" name="nome" className="form-field" placeholder="nome" />
                    <ErrorMessage
                        component="span"
                        name="nome"
                        className="form-error"
                    />
                </div>
                <div className="login-form-group">
                    <Field as={Input} size="large" name="email" className="form-field" placeholder="Email" />
                    <ErrorMessage
                        component="span"
                        name="email"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="password"
                        type="password"
                        className="form-field"
                        placeholder="Senha" />
                    <ErrorMessage
                        component="span"
                        name="password"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large" name="confirmPassword"
                        type="password"
                        className="form-field"
                        placeholder="Confirme sua senha" />
                    <ErrorMessage
                        component="span"
                        name="confirmPassword"
                        className="form-error"
                    />
                </div>
                <Button className="btn-login" size="large" primary type="submit">Cadastrar</Button>
            </Form>

        </Formik>
    </Authentication>
}

export default Register;