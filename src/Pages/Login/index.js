import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Label,
    LoginCard,
    LoginHeading,
    LoginWrapper,
    Button,
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
        if (localStorage.getItem('role') === 'NORMAL') {
            return <Redirect to="/chamados" />;
        }
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
                        <Label htmlFor="code">Matrícula</Label>
                        <Input
                            type="text"
                            name="code"
                            id="code"
                            value={loginForm.code}
                            onChange={handleLoginForm}
                            placeholder="Matrícula"
                        />
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={loginForm.password}
                            onChange={handleLoginForm}
                            placeholder="Senha"
                        />
                        <Button type="submit" onClick={(e) => handleLogin(e)}>
                            Entrar
                        </Button>
                    </Form>
                </LoginCard>
            </LoginWrapper>
        </>
    );
};

export default Login;
