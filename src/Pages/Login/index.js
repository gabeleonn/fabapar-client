import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    LoginCard,
    LoginHeading,
    LoginWrapper,
} from './LoginElements';

import useForm from '../../hooks/useForm';

import { auth } from '../../services';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [loginForm, handleLoginForm] = useForm({
        code: '',
        password: '',
    });

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        setLogged(auth.isLogged());
    }, [logged]);

    if (logged) {
        return <Redirect to="/" />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        let req = await auth.login(loginForm);
        if (req !== null) {
            setLogged(true);
        }
    };

    return (
        <>
            <LoginWrapper>
                <LoginCard>
                    <LoginHeading>Login</LoginHeading>
                    <Form method="POST">
                        <Input
                            type="text"
                            name="code"
                            value={loginForm.code}
                            onChange={handleLoginForm}
                            placeholder="Matrícula"
                        />
                        <Input
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleLoginForm}
                            placeholder="Senha"
                        />
                        <Input
                            type="submit"
                            value="Entrar"
                            onClick={(e) => handleLogin(e)}
                        />
                    </Form>
                </LoginCard>
            </LoginWrapper>
        </>
    );
};

export default Login;
