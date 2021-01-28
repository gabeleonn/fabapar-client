import React, { useEffect, useLayoutEffect, useState } from 'react';

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
    FaUsers as People,
    FaTachometerAlt as Dashboard,
    FaBoxes as Fixed,
    FaChartLine as Reports,
    FaUserCircle as Profile,
    FaFileAlt as Tickets,
} from 'react-icons/fa';

import { auth } from '../../services';
import { useAuth } from '../../context/AuthContext';

const NavMenu = () => {
    const [dropdown, setDropdown] = useState(false);

    const { user } = useAuth();

    const [role, setRole] = useState('');

    useEffect(() => {
        setRole('NORMAL');
    }, []);

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
                            <NavTopButton to="/login" onClick={auth.logout}>
                                Sair
                            </NavTopButton>
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
                {role === 'SUPER' || role === 'ADMIN' ? (
                    <>
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
                            name="Equipamentos"
                            exact
                            to="/equipamentos"
                            activeClassName="active"
                        >
                            <Fixed />
                        </Icon>
                        <Icon
                            name="Relatórios"
                            exact
                            to="/relatorios"
                            activeClassName="active"
                        >
                            <Reports />
                        </Icon>
                    </>
                ) : (
                    <Icon name="Chamados" exact to="/chamados">
                        <Tickets />
                    </Icon>
                )}
            </NavAside>
        </>
    );
};
export default NavMenu;
