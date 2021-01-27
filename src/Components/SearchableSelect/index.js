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
        if (typeof defaultValue !== 'undefined' && data.length > 0) {
            let user = data.filter((e) => e.code === defaultValue)[0];
            let value = '';
            if (user !== undefined) {
                value = `${user.firstname} ${user.lastname}`;
            } else {
                value = '';
            }
            updateValue(value);
        }
    }, [data, defaultValue]);

    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(data);

    const [value, updateValue] = useState('');

    const handleOptions = async (value) => {
        updateValue(value);
        setOptions(
            data.filter(
                (element) => element.code.match(new RegExp(value, 'i')) !== null
            )
        );
    };

    return (
        <Container>
            <Search>
                <Searchable
                    ref={searchField}
                    type="text"
                    onChange={(e) => handleOptions(e.target.value)}
                    onClick={() => setShow(!show)}
                    value={value}
                />
                <Icon />
            </Search>
            {show ? (
                <Selector>
                    {options.length > 0 ? (
                        options.slice(0, 5).map((element) => (
                            <SearchItem
                                key={element.code}
                                onClick={() => {
                                    handleSelect(element.code);
                                    setShow(false);
                                    updateValue(
                                        `${element.firstname} ${element.lastname}`
                                    );
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
