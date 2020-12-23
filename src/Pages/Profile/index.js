import React from 'react';

import { Title } from '../OtherElements';
import { ProfileWrapper, Form, Input, InputButton } from './ProfileElements';

const Profile = () => {
    return (
        <>
            <ProfileWrapper>
                <Title>Perfil</Title>
                <Form>
                    <Input type="text" placeholder="Nome" />
                    <Input type="text" placeholder="Sobrenome" />
                    <Input type="text" placeholder="Ramal" />
                    <Input type="text" placeholder="E-mail" />
                    <Input type="text" placeholder="Departamento" />
                    <InputButton type="submit" value="Salvar" />
                </Form>
            </ProfileWrapper>
        </>
    );
};

export default Profile;
