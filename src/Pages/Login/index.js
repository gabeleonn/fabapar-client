import React from 'react';
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

import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [loginForm, handleLoginForm] = useForm({
        code: '',
        password: '',
    });

    const { signIn } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        signIn(loginForm);
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
