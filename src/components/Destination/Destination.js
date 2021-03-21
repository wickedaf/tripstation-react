import React, { useState } from 'react';
import './Destination.css';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
// import mapImg from '../../images/Map.png';
import { useHistory, useParams } from 'react-router-dom';

const Destination = () => {
    const { tripName } = useParams();
    const [ location, setLocation ] = useState({});
    const { register, handleSubmit, errors } = useForm();
    // const onSubmit = data => console.log(data);
    let history = useHistory();
    
    const onSubmit = (data) => {
        const { pickFrom, pickTo} = data;
        if(tripName === 'Bike' || tripName === 'Car' || tripName === 'Bus' || tripName === 'Train'){
            history.push("/checkout/"+tripName+"/"+pickFrom +"/" +pickTo);
            setLocation(data);
        }else{
            alert("Please Go to Home and Select A Trip")
        }
    }

    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29205.405204237904!2d90.3363058282596!3d23.794561707454736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e96fce29dd%3A0x6ccd9e51aba9e64d!2s${location.pickFrom}%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616249252518!5m2!1sen!2sbd`
    return (
        <Container >
            <div className="row form-wrapper d-flex justify-content-between">
                <div className="col form-container bg-light rounded shadow">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>Pick From</p>
                        <input className="form-control shadow" name="pickFrom" defaultValue="Mirpur" ref={register} />
                        <br/>
                        <p>Pick To</p>
                        <input className="form-control shadow" name="pickTo" defaultValue="Dhanmondi"ref={register({ required: true })} />
                        {errors.exampleRequired && <span>This field is required</span>}
                        <br/>
                        <input className="form-control shadow bg-danger text-white"  type="submit" value="Search" />
                    </form>
                </div>
                <div className="col">
                    {/* <img className="shadow" src={mapImg} alt=""/> */}
                    <iframe title="tripstation-map" src={mapUrl} width="700" height="600" style={{border:0}} loading="lazy"></iframe>
                </div>
            </div>    
        </Container>
    );
};

export default Destination;