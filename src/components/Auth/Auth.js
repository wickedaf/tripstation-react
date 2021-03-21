import React, { useState } from 'react';
import './Auth.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Button, Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

if(firebase.apps.length === 0 ){ 
    firebase.initializeApp(firebaseConfig);
}

const Auth = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (result, redirect) =>{
        setUser(result);
        setLoggedInUser(result);
        if(redirect){
            history.replace(from);
        }
      }

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const {email, password} = data;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
           
            const user = userCredential.user;
            user.error = '';
            user.success = true;
            setUser(user); 
            handleResponse(user, true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => { 
            console.log(user);
            const {displayName, photoURL, email} = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            setUser(signedInUser);
            handleResponse(signedInUser, true);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
         });

    };
    const handleFacebookSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const {displayName, photoURL, email} = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            setUser(signedInUser);
            handleResponse(signedInUser, true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    
    return (
        <Container className="auth-container w-50">
            <div className="row w-75 mx-auto px-5">
                <div className="col">
                    <form onSubmit={handleSubmit(onSubmit)} className="border p-5 shadow"> 
                        {newUser ? <h4>Create an account</h4> : <h4>Login</h4>}
                        {newUser && <input className="form-control my-3" placeholder="Your Name" name="name" ref={register({ required: true, maxLength: 20 })} />}
                        <input className="form-control my-3" placeholder="Email" name="email" ref={register({ required: true, maxLength: 20 })} />
                        <input className="form-control my-3" placeholder="Password" name="password" type="password" ref={register({ required: true, pattern: /^[A-Za-z]+$/i })} />
                        {newUser && <input className="form-control my-3" placeholder="Confirm Password" name="confirmPassword" type="password" ref={register({ required: true, pattern: /^[A-Za-z]+$/i })} />}
                        {newUser 
                        ? <input className="form-control my-3 bg-primary text-white" type="submit" value="Create New User" />
                        : <input className="form-control my-3 bg-primary text-white" type="submit" value="Login" />}
                        { newUser 
                            ? <p>Already have an account? <Link onClick={() => setNewUser(!newUser)} >Login</Link></p>
                            : <p>Don't have an account? <Link onClick={() => setNewUser(!newUser)} >Create an account</Link></p>
                        }
                        
                    </form>
                </div>
                <br/>
            </div>
                 { user.success && <p style={{color: 'green', textAlign: 'center'}}>User {user.email} logged in successfully</p>}
            <hr className="w-100"/>
           <div className="row w-75 mx-auto px-5">
                <div className="col">
                    <Button className="form-control shadow" onClick={handleGoogleSignIn} variant="primary">Sign In With Google</Button>
                    <Button className="form-control my-2 shadow" onClick={handleFacebookSignIn} variant="primary">Sign In With Facebook</Button> 
                </div>
           </div>
        </Container>
    );
};

export default Auth;