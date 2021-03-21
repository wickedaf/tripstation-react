import React from 'react';
import { Container } from 'react-bootstrap';
import NotFoundImg from '../../images/notFound.gif';

const NoMatch = () => {
    return (
        <Container className="text-center">
            <img src={NotFoundImg} alt=""/>
        </Container>
    );
};

export default NoMatch;