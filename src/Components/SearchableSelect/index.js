import React, { useEffect, useRef, useState } from 'react';
import {
    Container,
    Searchable,
    SearchItem,
    None,
    Selector,
    Icon,
    Search,
} from './SelectElements';

const Select = ({ data, handleSelect, defaultValue }) => {
    const searchField = useRef();

    useEffect(() => {
        setOptions(data);
    }, [data]);

    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(data);

    const handleOptions = async (value) => {
        setOptions(
            data.filter(
                (element) => element.code.match(new RegExp(value, 'i')) !== null
            )
        );
    };

    const handleDefaultValue = () => {
        let user = data.filter((e) => e.code === defaultValue)[0];
        return `${user.firstname} ${user.lastname}`;
    };

    return (
        <Container>
            <Search>
                <Searchable
                    ref={searchField}
                    type="text"
                    onChange={(e) => handleOptions(e.target.value)}
                    onClick={() => setShow(!show)}
                    value={defaultValue ? handleDefaultValue() : ''}
                />
                <Icon />
            </Search>
            {show ? (
                <Selector>
                    {options.length > 0 ? (
                        options.map((element) => (
                            <SearchItem
                                key={element.code}
                                onClick={() => {
                                    handleSelect(element.code);
                                    setShow(false);
                                    searchField.current.value = `${element.firstname} ${element.lastname}`;
                                }}
                            >
                                {`${element.firstname} ${element.lastname}`}
                            </SearchItem>
                        ))
                    ) : (
                        <None>Nenhuma opção.</None>
                    )}
                </Selector>
            ) : null}
        </Container>
    );
};

export default Select;
