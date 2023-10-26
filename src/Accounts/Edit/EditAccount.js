import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../components/Spiner/Spiner"
import { singleAccountgetfunc, accountEditfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/context/ContextProvider';
import { ToastContainer, toast } from "react-toastify"
import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"



const EditAccount = () => {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [type, setType] = useState('credit')
    const [amount, setAmount] = useState('')
    const [summary, setSummary] = useState('')


    const { update, setUpdate } = useContext(updateData)

    const navigate = useNavigate();

    const [showspin, setShowSpin] = useState(true);

    const { id } = useParams();







    const accountProfileGet = async () => {

        const response = await singleAccountgetfunc(id);
        // console.log('Component rendered');
        // console.log('ID:', id);
        // console.log('Date:', response.data.date);
        // console.log('Type:', response.data.type);
        // console.log('Amount:', response.data.amount);
        // console.log('Summary:', response.data.summary);
        if (response.status === 200) {
            
            const formattedDate = new Date(response.data.date).toISOString().split('T')[0];
            setDate(formattedDate)
            setType(response.data.type)
            setAmount(response.data.amount)
            setSummary(response.data.summary)
        } else {
            console.log("error");
        }
    }


    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();
        if (amount === "") {
            toast.error("Amount is Required !")

        } else if (summary === "") {
            toast.error("Summary is Required !")
        } else {


            const response = await accountEditfunc(id, { date, type, amount, summary });
            console.log(response.message);
            if (response.status === 200) {
                setUpdate(response.data)
                navigate("/account")
            }

        }
    }

    useEffect(() => {
        accountProfileGet();
    }, [id])
    useEffect(() => {

        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, []);


    const handleClose = () => {
        console.log("Clicked on handle close");
        navigate('/account')
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
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail1">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control type="date" name='date' value={date} onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])} />
                                </Form.Group>
                                <Form.Group controlId="transactionType" className=" col-lg-12">
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className=" col-lg-12" controlId="formBasicEmail2">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="number" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' />
                                </Form.Group>
                                <Form.Group className="mb-2 col-lg-12" controlId="formBasicEmail3">
                                    <Form.Label>Summery</Form.Label>
                                    <Form.Control type="text" name='summary' value={summary} onChange={(e) => setSummary(e.target.value)} placeholder='Enter Summary' />
                                </Form.Group>

                                <div className='d-flex justify-content-end'>
                                    <Button variant="success" className='col-lg-3' style={{ marginRight: "8px" }}  onClick={submitUserData}>
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

export default EditAccount