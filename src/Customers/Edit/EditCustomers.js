import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../components/Spiner/Spiner"
import { singlecustomergetfunc, customerEditfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/context/ContextProvider';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"



const EditCustomers = () => {

    const [name, setName] = useState('')
    const [pBought, setpBought] = useState('')
    const [due, setdue] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])



    const { update, setUpdate } = useContext(updateData)

    const navigate = useNavigate();

    const [showspin, setShowSpin] = useState(true);

    const { id } = useParams();

    const customerProfileGet = async () => {

        const response = await singlecustomergetfunc(id);
        console.log(response);
        if (response.status === 200) {
            setName(response.data.name)
            setpBought(response.data.pBought)
            setdue(response.data.due)
            setDate(new Date(response.data.date).toISOString().split('T')[0])


        } else {
            console.log("error");
        }
    }


    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();
        const response = await customerEditfunc(id, { name, pBought, due, date });
        console.log(response);
        if (response.status === 200) {
            setUpdate(response.data)
            navigate("/customer")
        }
    }

    useEffect(() => {
        customerProfileGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, [id])


    const handleClose = () => {
        console.log("Clicked on handle close");
        navigate('/customer')
    }

    return (
        <>
            {
                showspin ? <Spiner /> : <div className="container" style={{
                    position: "absolute",
                    top: "20%",
                    left: "25%",
                    width: "35%"
                }}>
                    <Card className='shadow mt-3 p-3'>
                        <Form>
                            <Row> <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name='date' value={date} onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])} placeholder='Enter Product Bought' />
                            </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Product Bought</Form.Label>
                                    <Form.Control type="text" name='pBought' value={pBought} onChange={(e) => setpBought(e.target.value)} placeholder='Enter Bought' />
                                </Form.Group>
                                <Form.Group className="mb-2 col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Due</Form.Label>
                                    <Form.Control type="text" name='due' value={due} onChange={(e) => setdue(e.target.value)} placeholder='Enter Due' />
                                </Form.Group>
                                <div className='d-flex justify-content-end'>
                                    <Button variant="success" className='col-lg-3' style={{ marginRight: "8px" }} onClick={submitUserData}>
                                        Submit
                                    </Button>
                                    <Button variant="danger" className='col-lg-3' onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                    <ToastContainer position="top-center" />
                </div>
            }

        </>
    )
}

export default EditCustomers