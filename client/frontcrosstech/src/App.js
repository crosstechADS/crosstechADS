import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import logo from './logo.png';
function App() {

  //ação do botao cadastrar
  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      nome: values.nome,
      email: values.email,
      password: values.password
    }).then((Response) => {
      alert(Response.data.msg);
    });
  };

  //ação do botão login
  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      nome: values.nome,
      email: values.email,
      password: values.password
    }).then((Response) => {
      alert(Response.data.msg);
    });

  };

  //utilizando o yup para fazer a validação dos campos email e senha (min 8 caracteres), ambos preenchimento obrigatório
  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Formato inválido.")
      .required("Campo E-mail obrigatório"),
    password: yup
      .string()
      .min(8, "Formato de senha inválido")
      .required("Campo Senha obrigatório."),
  });

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

  return (


    <div className="background">
      <div className="container">
        <div className="logo"> <img src={logo} width="150" height="150" /> </div>

        <h1>Login</h1>
        <Formik initialValues={{}}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}>
          <Form className="login-form">
            <div className="login-form-group">
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>
            <div className="login-form-group">
              <Field name="password" type="password" className="form-field" placeholder="Senha" />
              <ErrorMessage
                component="span"
                name="password"
                className="form-error"
              />
            </div>
            <button className="button" type="submit">Entrar</button>
          </Form>
        </Formik>

        <h1>Cadastro</h1>
        <Formik initialValues={{}}
          onSubmit={handleClickRegister}
          validationSchema={validationCadastro}>
          <Form className="login-form">
            <div className="login-form-group">
              <Field name="nome" className="form-field" placeholder="nome" />
              <ErrorMessage
                component="span"
                name="nome"
                className="form-error"
              />
            </div>
            <div className="login-form-group">
              <Field name="email" className="form-field" placeholder="Email" />
              <ErrorMessage
                component="span"
                name="email"
                className="form-error"
              />
            </div>

            <div className="login-form-group">
              <Field name="password"
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
              <Field name="confirmPassword"
                type="password"
                className="form-field"
                placeholder="Confirme sua senha" />
              <ErrorMessage
                component="span"
                name="confirmPassword"
                className="form-error"
              />
            </div>
            <button className="button" type="submit">Cadastrar</button>
          </Form>

        </Formik>
      </div>
    </div>
  );
}

export default App;
