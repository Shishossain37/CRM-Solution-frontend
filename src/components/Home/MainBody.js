import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify"
import { signinfunction, resisterfunction } from '../../services/Apis'
import { addData } from '../context/ContextProvider';
import Alert from 'react-bootstrap/Alert';


import './main-body.css'
import NavBar from "./NavBar";
import Footer from "./Footer";
function MainBody() {
    const [checked, isChecked] = useState("");
    const [registerPage, showRegisterPage] = useState(false);

    let navigate = useNavigate();
    const { useradd, setUseradd } = useContext(addData);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",

    });
    // setInput Value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (checked) {
            sendData(userData);

        } else {
            alert("please click in checkbox");
        }
    };





    const sendData = async (data) => {
        if (data.name === "") {
            toast.error("Name is Required !")
        } else if (data.email === "") {
            toast.error("Email is Required !")
        } else if (data.password === "") {
            toast.error("Password is Required !")

        } else {
            const response = await resisterfunction(data);
            if (response.status === 200) {
                setUserData({
                    ...userData,
                    name: "",
                    email: "",
                    password: ""
                });
                setUseradd(response.data)
                showRegisterPage(false)
            } else {
                console.log(response.message);

            }
        }
    };

    const signIn = (e) => {
        const formdata = {
            email: userData.email,
            password: userData.password
        }
        const response = signinfunction(formdata)


        response
            .then((result) => {
                if (result.data.token) {
                    localStorage.setItem("jwt", result.data.token);
                    localStorage.setItem("user", JSON.stringify(result.data.user));
                    setUserData({
                        ...userData,
                        email: "",
                        password: ""
                    });
                    setUseradd(response.data)

                    navigate("/welcome");
                }
                if (result.error) {
                    console.log(result.error);
                }
            });
    };

    return (
        <>
            <NavBar />
            <div className="main-body mb-3" >
                <div className="form-control-lg" style={{
                    width: "40%",
                    minHeight: "38vh",
                    position: "absolute",
                    margin: "7% 5%"
                }}>
                    <p style={{ fontSize: "3.75rem", fontWeight: "600" }}>Custome Solution</p>
                    <p style={{ fontSize: "0.7rem", color: "#565657", fontWeight: "800", margin: "60px 0" }}>Checkout our CRM solution for your grocery Stores.</p>
                    {registerPage ? (
                        <h6>Already Have An Account?</h6>
                    ) : (
                        <h6>Don't Have An Account?</h6>
                    )}

                    {!registerPage && (
                        <Button variant="outline-primary" className="btnn"


                            onClick={() => showRegisterPage(true)}
                        >
                            Register
                        </Button>
                    )}
                    {registerPage && (
                        <Button variant="outline-primary" className="btnn"

                            onClick={() => showRegisterPage(false)}
                        >
                            Sign in
                        </Button>
                    )}
                </div>
                {!registerPage && (
                    <div className='form-control-lg mt-3 p-3' style={{ width: "40%", position: "relative", left: "50%", top: '4rem', height: "76vh" }}>
                        <h3 >Signin</h3>
                        {/* sign in form */}
                        <Form>
                            <Form.Group className="col-lg-12" controlId="formBasicEmail5">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name='email' value={userData.email} onChange={setInputValue} placeholder='Enter Name' />
                            </Form.Group>
                            <Form.Group className="col-lg-12" controlId="formBasicEmail6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' value={userData.password} onChange={setInputValue} placeholder='Enter Name' />
                            </Form.Group>
                            <Button variant="primary" className="bg-primary" onClick={signIn} style={{ margin: "1rem 10rem" }}>
                                Signin
                            </Button>
                        </Form>
                    </div>
                )}
                {registerPage && (
                    <div>
                        <div className='form-control-lg mt-3 p-3' style={{ width: "40%", position: "relative", left: "50%", top: "4rem" }}>
                            <h3 >Register</h3>
                            {/* Register form */}
                            <Form onSubmit={(e) => signIn(e)}>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' value={userData.name} onChange={setInputValue} placeholder='Enter Name' />
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name='email' value={userData.email} onChange={setInputValue} placeholder='Enter Name' />
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name='password' value={userData.password} onChange={setInputValue} placeholder='Enter Name' />
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail4">
                                    <label>
                                        <input type="checkbox" onClick={(e) => isChecked(e.target.checked)} />
                                    </label>
                                    <span
                                        style={{
                                            fontSize: ".7rem",
                                            position: "relative",

                                            color: "#5861AE",
                                        }}
                                    >
                                        I agree to Terms & Condition receiving marketing and
                                        promotional materials
                                    </span>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(e) => submitHandler(e)} style={{ margin: "1rem 10rem" }}>
                                    Register
                                </Button>

                            </Form>
                        </div>

                    </div>
                )}
            </div>
            <Footer />

        </>
    );
}
export default MainBody;
