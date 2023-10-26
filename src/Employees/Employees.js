import Headers from '../components/Headers/Headers'
import Sidebar from '../components/Sidebar/Sidebar'

import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { employeeregisterfunc, employeegetfunc, employeedeletfunc} from "../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { addData, dltdata, updateData } from '../components/context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Paginations from '../components/pagination/Paginations';
import { Link, useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

import './employees.css'
import Spiner from '../components/Spiner/Spiner';

const Employees = () => {
    const [showform, setShowform] = useState(false)

    const navigate = useNavigate()
    const [userdata, setUserData] = useState([]);
    const [showspin, setShowSpin] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const { useradd, setUseradd } = useContext(addData);
    const { deletedata, setDLtdata } = useContext(dltdata);



    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');


    // const [isEditMode, setIsEditMode] = useState(false);
    const [name, setname] = useState('');
    const [role, setRole] = useState('');
    const [exp, setExp] = useState('');
    const [salary, setsalary] = useState('');
    const [spd, setSpd] = useState(new Date().toISOString().split('T')[0]);
    const [leave, setleave] = useState('');
    const { update, setUpdate } = useContext(updateData);
    const { id } = useParams();


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


    // get user
    const userGet = async () => {
        let response;

        if (selectedMonth && selectedYear) {
            response = await employeegetfunc(search, page, { selectedMonth, selectedYear });
        } else {
            response = await employeegetfunc(search, page, {});
        }


        if (response.status === 200) {
            setUserData(response.data.employeeData);
            setPageCount(response.data.Pagination.pageCount);
        } else {
            console.log("Error fetching user data");
        }
    };



    // user delete
    const deleteUser = async (id) => {
        const response = await employeedeletfunc(id);
        if (response.status === 200) {
            userGet();
            setDLtdata(response.data)
            navigate('/employee')
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
    useEffect(() => {
        userGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, [search, page, selectedMonth, selectedYear])

    const submitUserData = async (e) => {
        e.preventDefault();
        if (name === "") {
            toast.error("Name is Required !")
        } else if (role === "") {
            toast.error("Role is Required !")
        } else if (exp === "") {
            toast.error("Experience is Required !")

        }
        else if (salary === "") {
            toast.error("Salary is Required !")
        }
        else if (leave === "") {
            toast.error("Leave is Required !")
        }
        else {
            const response = await employeeregisterfunc({ name, spd, exp, role, salary, leave });
            if (response.status === 200 || response.status === 201) {
                setname('')
                setRole('')
                setExp('')
                setsalary('')
                setleave('')
                setSpd(new Date().toISOString().split('T')[0])
                setUseradd(response.data)
                userGet()
                navigate("/employee");
                setShowform(false);
            } else {
                toast.error("Error!")
            }
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, []);

    const handleClose = () => {
        setShowform(false);
        navigate('/employee');
    }


    return (
        <div>
            <Headers />
            <div className='d-flex'>
                <div className='col-auto' style={{ position: "absolute" }}>
                    <Sidebar />
                </div>
            </div>
            {
                useradd ? <Alert variant="success" className='alert' onClose={() => setUseradd("")} dismissible>{useradd.name} Succesfully Added</Alert> : ""
            }

            {
                update ? <Alert variant="primary" className='alert' onClose={() => setUpdate("")} dismissible>{update.name} Succesfully Update</Alert> : ""
            }

            {
                deletedata ? <Alert variant="danger" className='alert' onClose={() => setDLtdata("")} dismissible>{deletedata.name} Succesfully Delete</Alert> : ""
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
                width: "75%",
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
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Exp. In Shop</th>
                                                <th>Salary</th>
                                                <th>Salary Payment Date</th>
                                                <th>Leave Taken</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userdata.length > 0 ? userdata.map((element, index) => {
                                                    return (
                                                        <React.Fragment key={index}>

                                                            <tr>
                                                                <td>{index + 1 + (page - 1) * 4}</td>
                                                                <td>{element.name}</td>
                                                                <td>{element.role}</td>
                                                                <td>{element.exp}</td>
                                                                <td>{element.salary}</td>
                                                                <td>{new Date(element.spd).toLocaleDateString()}</td>
                                                                <td>{element.leave}</td>

                                                                <td>
                                                                    <Dropdown>
                                                                        <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item >
                                                                                
                                                                                <Link to={`/employee/${element._id}`} className="text-decoration-none">
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
                                                }) : <tr><td colSpan="7" className='no_data text-center'>NO Data Found</td></tr>
                                            }


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

            {showform && (

                <div className="container" style={{ position: "absolute", top: "20%", left: "25%", width: "45%" }}>
                    <Card className="shadow mt-3 p-3">
                        <Form>
                            <Row>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter Role" />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Exp. In Shop</Form.Label>
                                    <Form.Control type="text" name="exp" value={exp} onChange={(e) => setExp(e.target.value)} placeholder="Enter Exp. In shop" />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control type="text" name="salary" value={salary} onChange={(e) => setsalary(e.target.value)} placeholder="Enter Salary" />
                                </Form.Group>
                                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Salary Payment Date</Form.Label>
                                    <Form.Control type="date" name="spd" value={spd} onChange={(e) => setSpd(new Date(e.target.value).toISOString().split('T')[0])} />
                                </Form.Group>
                                <Form.Group className="mb-2 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Leave Taken</Form.Label>
                                    <Form.Control type="text" name="leave" value={leave} onChange={(e) => setleave(e.target.value)} placeholder="Enter Leave Taken" />
                                </Form.Group>

                                <div className="d-flex justify-content-end">
                                    <Button variant="success" className="col-lg-3" style={{ marginRight: "8px" }} onClick={submitUserData}>
                                        Submit
                                    </Button>
                                    <Button variant="danger" className="col-lg-3" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                    <ToastContainer position="top-center" />
                </div>
            )}


        </div>
    )
}

export default Employees
