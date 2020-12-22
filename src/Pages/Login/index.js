import React from 'react';
import {
    Form,
    Input,
    LoginCard,
    LoginHeading,
    LoginWrapper,
} from './LoginElements';

const Login = () => {
    return (
        <>
            <LoginWrapper>
                <LoginCard>
                    <LoginHeading>Login</LoginHeading>
                    <Form>
                        <Input type="text" placeholder="Matrícula" />
                        <Input type="password" placeholder="Senha" />
                        <Input type="submit" value="Entrar" />
                    </Form>
                </LoginCard>
            </LoginWrapper>
        </>
    );
};

export default Login;
