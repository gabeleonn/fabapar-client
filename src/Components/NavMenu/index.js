import React, { useLayoutEffect, useState } from 'react';

import {
    NavAside,
    NavTop,
    Logo,
    NavTopButtons,
    Icon,
    Dropdown,
    DropdownOption,
    NavTopButton,
} from './NavElements';

import {
    FaRecycle as Discard,
    FaUsers as People,
    FaTachometerAlt as Dashboard,
    FaBoxes as Fixed,
    FaDolly as Loans,
    //FaChartLine as Reports,
    FaUserCircle as Profile,
    FaFileAlt as Tickets,
} from 'react-icons/fa';

const NavMenu = () => {
    const [dropdown, setDropdown] = useState(false);

    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <>
            <NavTop>
                <Logo exact to="/">
                    FABAPAR
                </Logo>
                <NavTopButtons>
                    {size[0] < 768 ? (
                        <Profile onClick={() => setDropdown(!dropdown)} />
                    ) : (
                        <>
                            <NavTopButton to="/me">Perfil</NavTopButton>
                            <NavTopButton to="/logout">Sair</NavTopButton>
                        </>
                    )}
                    {size[0] < 768 && dropdown ? (
                        <Dropdown onClick={() => setDropdown(!dropdown)}>
                            <DropdownOption exact to="/me">
                                Perfil
                            </DropdownOption>
                            <DropdownOption exact to="/logout">
                                Sair
                            </DropdownOption>
                        </Dropdown>
                    ) : null}
                </NavTopButtons>
            </NavTop>
            <NavAside>
                <Icon name="Dashboard" exact to="/">
                    <Dashboard />
                </Icon>
                <Icon name="Chamados" exact to="/chamados">
                    <Tickets />
                </Icon>
                <Icon
                    name="Usuários"
                    exact
                    to="/usuarios"
                    activeClassName="active"
                >
                    <People />
                </Icon>
                <Icon
                    name="Itens Fixos"
                    exact
                    to="/itens-fixos"
                    activeClassName="active"
                >
                    <Fixed />
                </Icon>
                <Icon
                    name="Empréstimos"
                    exact
                    to="/emprestimos"
                    activeClassName="active"
                >
                    <Loans />
                </Icon>
                <Icon
                    name="Descartados"
                    exact
                    to="/descartados"
                    activeClassName="active"
                >
                    <Discard />
                </Icon>
                {/* <Icon name="Relatórios" exact to="/relatorios" activeClassName="active">
                    <Reports />
                </Icon> */}
            </NavAside>
        </>
    );
};
export default NavMenu;
