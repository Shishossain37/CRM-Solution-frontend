import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../components/Spiner/Spiner"
import { singleappointmentgetfunc, appointmentEditfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/context/ContextProvider';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"



const Editappointments = () => {

    const [name, setName] = useState('')
    const [regard, setRegard] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])



    const { update, setUpdate } = useContext(updateData)

    const navigate = useNavigate();

    const [showspin, setShowSpin] = useState(true);

    const { id } = useParams();

    const appointmentProfileGet = async () => {

        const response = await singleappointmentgetfunc(id);
        console.log(response);
        if (response.status === 200) {
            setName(response.data.name)
            setDate(new Date(response.data.date).toISOString().split('T')[0])
            setTime(response.data.time)
            setRegard(response.data.regard)

        } else {
            console.log("error");
        }
    }


    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();
        const response = await appointmentEditfunc(id, { name, date, time, regard, });
        console.log(response);
        if (response.status === 200) {
            setUpdate(response.data)
            navigate("/appointment")
        }
    }

    useEffect(() => {
        appointmentProfileGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, [id])
   


    const handleClose = () => {
        console.log("Clicked on handle close");
        navigate('/appointment')
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
                            <Row>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" name='date' value={date} onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])} placeholder='Enter Product Bought' />
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="text" name='time' value={time} onChange={(e) => setTime(e.target.value)} placeholder='Enter Time' />
                                </Form.Group>
                                <Form.Group className="mb-2 col-lg-12" controlId="formBasicEmail">
                                    <Form.Label>Regarding</Form.Label>
                                    <Form.Control type="text" name='due' value={regard} onChange={(e) => setRegard(e.target.value)} placeholder='Enter Regarding' />
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

export default Editappointments