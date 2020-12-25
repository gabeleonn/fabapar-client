import React from 'react';

import {
    Wrapper,
    Header,
    Title,
    AddButton,
    ElementList,
    Element,
    Row,
    Label,
    Value,
    Status,
    SearchBar,
    SearchInput,
    Head,
} from '../OtherElements';

const Loans = () => {
    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Relatórios</Title>
                        <AddButton />
                    </Head>
                    <SearchBar>
                        <SearchInput type="text" placeholder="Pesquisa" />
                    </SearchBar>
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
