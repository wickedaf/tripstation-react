import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import data from '../../data/data.json';
import Trip from '../Trip/Trip';
import './Home.css'

const Home = () => {
    const [ tripType, setTripType] = useState([]);
    useEffect(() => {
        setTripType(data);
    },[tripType]);

    return ( 
        <Container className="d-flex flex-wrap justify-content-center align-items-center mt-5">
            {
                tripType.map(trip => <Trip key={trip.id} tripInfo={trip}></Trip>)
            }
        </Container>
    );
};

export default Home;