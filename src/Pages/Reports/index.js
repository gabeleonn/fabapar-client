import React from 'react';

import {
    Wrapper,
    Header,
    Title,
    Filters,
    Filter,
    ElementList,
    Element,
    Row,
    Label,
    Value,
    Status,
} from '../OtherElements';

const Loans = () => {
    return (
        <>
            <Wrapper>
                <Header>
                    <Title>Relatórios</Title>
                    <Filters>
                        <Filter>Filtro 1</Filter>
                        <Filter>Filtro 2</Filter>
                        <Filter>Filtro 3</Filter>
                        <Filter>Filtro 4</Filter>
                        <Filter>Filtro 5</Filter>
                    </Filters>
                </Header>
                <ElementList>
                    <Element>
                        <Row primary={true}>
                            <Label>Label: </Label>
                            <Value>Value</Value>
                        </Row>
                        <Row>
                            <Label>Label1: </Label>
                            <Value>Value1</Value>
                        </Row>
                        <Status>Status</Status>
                    </Element>
                    <Element>
                        <Row primary={true}>
                            <Label>Label: </Label>
                            <Value>Value</Value>
                        </Row>
                        <Row>
                            <Label>Label1: </Label>
                            <Value>Value1</Value>
                        </Row>
                        <Status>Status</Status>
                    </Element>
                    <Element>
                        <Row primary={true}>
                            <Label>Label: </Label>
                            <Value>Value</Value>
                        </Row>
                        <Row>
                            <Label>Label1: </Label>
                            <Value>Value1</Value>
                        </Row>
                        <Status>Status</Status>
                    </Element>
                    <Element>
                        <Row primary={true}>
                            <Label>Label: </Label>
                            <Value>Value</Value>
                        </Row>
                        <Row>
                            <Label>Label1: </Label>
                            <Value>Value1</Value>
                        </Row>
                        <Status>Status</Status>
                    </Element>
                    <Element>
                        <Row primary={true}>
                            <Label>Label: </Label>
                            <Value>Value</Value>
                        </Row>
                        <Row>
                            <Label>Label1: </Label>
                            <Value>Value1</Value>
                        </Row>
                        <Status>Status</Status>
                    </Element>
                    <Element>
                        <Row primary={true}>
                            <Label>Label: </Label>
                            <Value>Value</Value>
                        </Row>
                        <Row>
                            <Label>Label1: </Label>
                            <Value>Value1</Value>
                        </Row>
                        <Status>Status</Status>
                    </Element>
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Loans;
