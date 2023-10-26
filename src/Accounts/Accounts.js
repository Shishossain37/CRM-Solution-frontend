import Headers from '../components/Headers/Headers'
import Sidebar from '../components/Sidebar/Sidebar'

import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../components/Spiner/Spiner"
import { accountsregisterfunc, accountusergetfunc, accountdeletfunc } from "../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { addData, dltdata, updateData } from '../components/context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Paginations from '../components/pagination/Paginations';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './accounts.css'
import { isValid } from 'date-fns';

const Accounts = () => {
    const navigate = useNavigate()
    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const { useradd, setUseradd } = useContext(addData);
    const { update, setUpdate } = useContext(updateData);
    const { deletedata, setDLtdata } = useContext(dltdata);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalender, setShowCalender] = useState(false)

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');


    const months = [
        { value: '', label: 'Select Month' },
        { value: '01', label: 'Jan' },
        { value: '02', label: 'Feb' },
        { value: '03', label: 'Mar' },
        { value: '04', label: 'Apr' },
        { value: '05', label: 'May' },
        { value: '06', label: 'Jun' },
        { value: '07', label: 'Jul' },
        { value: '08', label: 'Aug' },
        { value: '09', label: 'Sep' },
        { value: '10', label: 'Oct' },
        { value: '11', label: 'Nov' },
        { value: '12', label: 'Dec' }
    ];

    const years = [
        { value: '', label: 'Select Year' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
    ];

    const handleDateClick = date => {
        console.log(date);
        if (isValid(date)) {
            setSelectedDate(date);
            setShowCalender(false);
            userGet();
        } else {
            toast.error("Invalid Date");
        }
    };
    const toggleCalender = () => {
        setShowCalender(!showCalender)
    }
    // get user
    const userGet = async () => {
        let response;

        if (selectedMonth && selectedYear) {
            response = await accountusergetfunc(search, page, { selectedMonth, selectedYear });
        } else {
            response = await accountusergetfunc(search, page, {});

        }


        if (response.status === 200) {
            setUserData(response.data.accountData);
            setPageCount(response.data.Pagination.pageCount);
        } else {
            console.log("Error fetching user data");
        }

    }


    // user delete
    const deleteUser = async (id) => {
        const response = await accountdeletfunc(id);
        if (response.status === 200) {
            userGet();
            setDLtdata(response.data)
        } else {
            toast.error("error")
        }
    }


    // pagination
    // handle prev btn
    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1
        })
    }
    // handle next btn
    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1
        })
    }


    // for adding product
    const [showform, setShowform] = useState(false)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [type, setType] = useState('credit')
    const [amount, setAmount] = useState('')
    const [summary, setSummary] = useState('')

    const submitUserData = async (e) => {
        e.preventDefault();
        if (date === "") {
            toast.error("Date is Required !")
        } else if (amount === "") {
            toast.error("Amount is Required !")
        } else if (summary === "") {
            toast.error("Price is Required !")
        } else {
            const response = await accountsregisterfunc({ date, type, amount, summary });
            console.log(response);
            if (response.status === 201) {
                setDate(new Date().toISOString().split('T')[0])
                setType('credit')
                setAmount('')
                setSummary('')
                setUseradd(response.data)
                userGet()
                navigate("/account");
                setShowform(false);
            } else {
                toast.error("Error!")
            }
        }
    }


    useEffect(() => {
        userGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, [search, page, selectedMonth, selectedYear])


    return (
        <div>
            <Headers />
            <div className='d-flex'>
                <div className='col-auto' style={{ position: "absolute" }}>
                    <Sidebar />
                </div>
            </div>
            {
                useradd ? <Alert variant="success" className='alert' onClose={() => setUseradd("")} dismissible>{useradd.date} Succesfully Added</Alert> : ""
            }

            {
                update ? <Alert variant="primary" className='alert' onClose={() => setUpdate("")} dismissible>{update.date} Succesfully Update</Alert> : ""
            }

            {
                deletedata ? <Alert variant="danger" className='alert' onClose={() => setDLtdata("")} dismissible>{deletedata.date} Succesfully Delete</Alert> : ""
            }
            <div style={{
                position: "relative",
                left: "20%",
                top: "0.75rem",
                width: "12%"
            }}>
                <Dropdown onSelect={(eventKey) => setSelectedMonth(eventKey)} aria-labelledby="month-dropdown" style={{ marginRight: '1rem', position: "absolute" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-month" aria-expanded={selectedMonth !== ''}>
                        {months.find((month) => month.value === selectedMonth)?.label || 'Select Month'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {months.map((month) => (
                            <Dropdown.Item key={month.value} eventKey={month.value}>
                                {month.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={(eventKey) => setSelectedYear(eventKey)} aria-labelledby="year-dropdown" style={{ marginRight: '1rem', position: "relative", left: "8rem" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-year" aria-expanded={selectedYear !== ''}>
                        {years.find((year) => year.value === selectedYear)?.label || 'Select Year'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {years.map((year) => (
                            <Dropdown.Item key={year.value} eventKey={year.value}>
                                {year.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

            </div>

            <div className="main_div" style={{
                position: "relative",
                left: "20%",
                width: "75%"
                // top: "10%"
            }}>
                {/* search add btn */}
                <div className="search_add mt-4 d-flex justify-content-between">
                    <div className="search col-lg-4">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="success" className='search_btn'>Search</Button>
                        </Form>
                    </div>
                    <div className="add_btn">
                        <Button variant="primary" onClick={() => setShowform(true)}> <i className="fa-solid fa-plus"></i>&nbsp;</Button>
                    </div>
                </div>

            </div>



            {
                showspin ? <Spiner /> : (
                    <div className="container " style={{
                        position: "relative",
                        left: "8%",
                        width: "75%"
                    }}>
                        <Row>
                            <div className="col mt-3">
                                <Card className='shadow '>

                                    <Table className='align-items-center' responsive="sm">

                                        <thead className='thead-dark'>
                                            <tr className='table-dark'>
                                                <th>ID</th>
                                                <th>Select Date</th>
                                                <th>Type</th>
                                                <th>Amount</th>
                                                <th>Summery</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userdata.length > 0 ? userdata.map((element, index) => {
                                                    return (
                                                        <React.Fragment key={index}>

                                                            <tr >
                                                                <td>{index + 1 + (page - 1) * 4}</td>
                                                                <td>{new Date(element.date).toLocaleDateString()}</td>
                                                                <td>{element.type}</td>
                                                                <td>{element.amount}</td>
                                                                <td>{element.summary}</td>

                                                                <td>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item >
                                                                                <Link to={`/accountedit/${element._id}`} className="text-decoration-none">
                                                                                    <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                                                                </Link>
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item >
                                                                                <div onClick={() => deleteUser(element._id)}>
                                                                                    <i className="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                                                                </div>
                                                                            </Dropdown.Item>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                }) : <tr><td colSpan="7" className='no_data text-center'>NO Data Found</td></tr>}


                                        </tbody>
                                    </Table>
                                    <Paginations
                                        handlePrevious={handlePrevious}
                                        handleNext={handleNext}
                                        page={page}
                                        pageCount={pageCount}
                                        setPage={setPage}
                                    />
                                </Card>
                            </div>
                        </Row>
                        <ToastContainer />
                    </div>
                )
            }

            {
                showform && <div className="container" style={{
                    position: "absolute",
                    top: "20%",
                    left: "25%",
                    width: "45%"
                }}>
                    <Card className='shadow mt-3 p-3'>
                        <Form>
                            <Row>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control type="date" name='date' value={date} onChange={(e) => setDate(new Date(e.target.value).toISOString().split('T')[0])} />
                                </Form.Group>
                                <Form.Group controlId="transactionType" className=" col-lg-6">
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="number" name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter Amount' />
                                </Form.Group>
                                <Form.Group className="mb-1 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Summery</Form.Label>
                                    <Form.Control type="text" name='summary' value={summary} onChange={(e) => setSummary(e.target.value)} placeholder='Enter Summary' />
                                </Form.Group>

                                <div className='d-flex justify-content-end'>
                                    <Button variant="success" className='col-lg-3' style={{ marginRight: "8px" }} onClick={submitUserData}>
                                        Submit
                                    </Button>
                                    <Button variant="danger" className='col-lg-3' onClick={() => setShowform(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                    <ToastContainer position="top-center" />
                </div>
            }

        </div>
    )
}

export default Accounts
