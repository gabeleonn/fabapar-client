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

const Select = ({ data, handleSelect, defaultValue, type, disabled }) => {
    const searchField = useRef();

    useEffect(() => {
        setOptions(data);
        if (typeof defaultValue !== 'undefined' && data.length > 0) {
            let element = '';
            let value = '';

            if (type === 'user') {
                element = data.filter((e) => e.code === defaultValue)[0];
                if (element !== undefined) {
                    value = `${element.firstname} ${element.lastname}`;
                } else {
                    value = '';
                }
            } else if (type === 'item') {
                element = data.filter((e) => e.id === defaultValue)[0];
                if (element !== undefined) {
                    value = element.description;
                } else {
                    value = '';
                }
            }

            updateValue(value);
        }
    }, [data, defaultValue, type]);

    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(data);

    const [value, updateValue] = useState('');

    const handleOptions = async (value) => {
        updateValue(value);
        setOptions(
            data.filter(
                (element) =>
                    element.code.match(new RegExp(value, 'i')) !== null ||
                    element.firstname.match(new RegExp(value, 'i')) !== null ||
                    element.lastname.match(new RegExp(value, 'i')) !== null
            )
        );
    };

    return (
        <Container>
            <Search>
                <Searchable
                    disabled={!!disabled}
                    ref={searchField}
                    type="text"
                    onChange={(e) => handleOptions(e.target.value)}
                    onClick={() => setShow(!show)}
                    value={value}
                    placeholder="Digite nome ou matrícula do funcionário..."
                    onFocus={() => updateValue('')}
                />
                <Icon />
            </Search>
            {show ? (
                <Selector>
                    {options.length > 0 ? (
                        options.slice(0, 5).map((element) => (
                            <SearchItem
                                key={
                                    type === 'user' ? element.code : element.id
                                }
                                onClick={() => {
                                    handleSelect(element);
                                    setShow(false);
                                    if (type === 'user') {
                                        updateValue(
                                            `${element.firstname} ${element.lastname}`
                                        );
                                    } else if (type === 'item') {
                                        updateValue(`${element.description}`);
                                    }
                                }}
                            >
                                {type === 'user'
                                    ? `${element.firstname} ${element.lastname}`
                                    : element.description}
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
