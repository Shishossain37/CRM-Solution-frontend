import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../components/Spiner/Spiner"
import { singleEmployeegetfunc, employeeEditfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/context/ContextProvider';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"



const EditEmployee = () => {

    const [name, setname] = useState('')
    const [role, setRole] = useState('')
    const [exp, setExp] = useState('')
    const [salary, setsalary] = useState('')
    const [spd, setSpd] = useState(new Date().toISOString().split('T')[0])
    const [leave, setleave] = useState('')


    const { update, setUpdate } = useContext(updateData)

    const navigate = useNavigate();

    const [showspin, setShowSpin] = useState(true);

    const { id } = useParams();

    const employeeProfileGet = async () => {

        const response = await singleEmployeegetfunc(id);
        console.log(response);
        if (response.status === 200) {
            setname(response.data.name)
            setRole(response.data.role)
            setExp(response.data.exp)
            setSpd(new Date(response.data.spd).toISOString().split('T')[0])
            setsalary(response.data.salary)
            setleave(response.data.leave)
        } else {
            console.log("error");
        }
    }


    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();
        const response = await employeeEditfunc(id, { name, role, exp, spd, leave, salary });
        console.log(response);
        if (response.status === 200) {
            setUpdate(response.data)
            navigate("/employee")
        }
    }

    useEffect(() => {
        employeeProfileGet();
    }, [id])
    useEffect(() => {

        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, []);


    const handleClose = () => {
        console.log("Clicked on handle close");
        navigate('/employee')
    }

    return (
        <>
            {
                showspin ? <Spiner /> : <div className="container" style={{
                    position: "absolute",
                    top: "20%",
                    left: "25%",
                    width: "45%"
                }}>
                    <Card className='shadow mt-3 p-3'>
                        <Form>
                            <Row>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Name' />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" name='role' value={role} onChange={(e) => setRole(e.target.value)} placeholder='Enter Role' />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Exp. In Shop</Form.Label>
                                    <Form.Control type="text" name='exp' value={exp} onChange={(e) => setExp(e.target.value)} placeholder='Enter Exp. In shop' />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control type="text" name='salary' value={salary} onChange={(e) => setsalary(e.target.value)} placeholder='Enter Salary' />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Salary Payment Date</Form.Label>
                                    <Form.Control type="date" name='spd' value={spd} onChange={(e) => setSpd(new Date(e.target.value).toISOString().split('T')[0])} />
                                </Form.Group>
                                <Form.Group className="mb-2 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Leave Taken</Form.Label>
                                    <Form.Control type="text" name='leave' value={leave} onChange={(e) => setleave(e.target.value)} placeholder='Enter Leave Taken' />
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

export default EditEmployee
