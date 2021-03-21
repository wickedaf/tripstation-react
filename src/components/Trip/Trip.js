import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Trip = (props) => {
    const{name, img} = props.tripInfo;
    return (
        <Card style={{ width: '12rem' }} className="shadow">
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title className="text-center">
                    <Link to={`/trip-type/${name}`}>{name}</Link>
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default Trip;