import React, { useState } from 'react';

import {
    NavAside,
    NavTop,
    Logo,
    NavTopButtons,
    Icon,
    Dropdown,
    DropdownOption,
} from './NavElements';

import {
    FaRecycle as Discard,
    FaUsers as People,
    FaTachometerAlt as Dashboard,
    FaBoxes as Fixed,
    FaDolly as Loans,
    FaChartLine as Reports,
    FaUserCircle as Profile,
    FaFileAlt as Tickets,
} from 'react-icons/fa';

const NavMenu = () => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            <NavTop>
                <Logo exact to="/">
                    IT MANAGER
                </Logo>
                <NavTopButtons onClick={() => setDropdown(!dropdown)}>
                    <Profile />
                    {dropdown ? (
                        <Dropdown>
                            <DropdownOption exact to="/me">
                                Perfil
                            </DropdownOption>
                            <DropdownOption exact to="/sair">
                                Sair
                            </DropdownOption>
                        </Dropdown>
                    ) : null}
                </NavTopButtons>
            </NavTop>
            <NavAside>
                <Icon exact to="/">
                    <Dashboard />
                </Icon>
                <Icon exact to="/tickets">
                    <Tickets />
                </Icon>
                <Icon exact to="/usuarios" activeClassName="active">
                    <People />
                </Icon>
                <Icon exact to="/itens-fixos" activeClassName="active">
                    <Fixed />
                </Icon>
                <Icon exact to="/emprestimos" activeClassName="active">
                    <Loans />
                </Icon>
                <Icon exact to="/descartados" activeClassName="active">
                    <Discard />
                </Icon>
                <Icon exact to="/relatorios" activeClassName="active">
                    <Reports />
                </Icon>
            </NavAside>
        </>
    );
};
export default NavMenu;
