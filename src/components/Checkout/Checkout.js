import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './Checkout.css';
import { useParams } from 'react-router-dom';
import data from '../../data/data.json';
// import mapImg from '../../images/Map.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
    const { tripName, locationFrom, locationTo } = useParams();
    const [ trip, setTrip ] = useState([]);

    useEffect(()=> {
        const tripResult = data.find(trp => trp.name === tripName);
        setTrip(tripResult);
    }, [tripName]);

    const { img, name } = trip;
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29205.405204237904!2d90.3363058282596!3d23.794561707454736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2s${locationFrom}%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616249252518!5m2!1sen!2sbd`
    return (
        <Container className="checkout-container rounded">
            <div className="row g-2 d-flex justify-content-between">
                <div className="col bg-light h-50">
                    <div className="p-3 my-3 bg-danger rounded shadow text-white">
                        <ul>
                            <li>
                                <div className="px-3">{locationFrom}</div>
                            </li>
                            <li>
                                <div className="px-3">{locationTo}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3 my-3 shadow rounded bg-white d-flex justify-content-between align-items-center">
                        <img src={img} className="w-25" alt=""/>
                        <h5>{name}</h5>
                        <p><FontAwesomeIcon icon={faUserFriends} /> 4</p>
                        <p>$67</p>
                    </div>
                    <div className="p-3 my-3 shadow rounded bg-white d-flex justify-content-between">
                        <img src={img} className="w-25" alt=""/>
                        <h5>{name}</h5>
                        <p><FontAwesomeIcon icon={faUserFriends} /> 4</p>
                        <p>$67</p>
                    </div>
                    <div className="p-3 my-3 bg-white rounded shadow d-flex justify-content-between">
                        <img src={img} className="w-25" alt=""/>
                        <h5>{name}</h5>
                        <p><FontAwesomeIcon icon={faUserFriends} /> 4</p>
                        <p>$67</p>
                    </div>
                </div>
                <div className="col">
                    {/* <img className="shadow" src={mapImg} alt=""/> */}
                    <iframe title="tripstation-map" src={mapUrl} width="700" height="600" style={{border:0}} loading="lazy"></iframe>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;