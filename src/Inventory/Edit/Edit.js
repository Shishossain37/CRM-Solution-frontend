import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../components/Spiner/Spiner"
import { singleUsergetfunc, editfunc } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from '../../components/context/ContextProvider';
import { ToastContainer, toast } from "react-toastify"
import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"



const Edit = () => {
  const [inputdata, setInputData] = useState({
    pName: "",
    category: "",
    stock: "",
    price: "",
  });

  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const { update, setUpdate } = useContext(updateData)

  const navigate = useNavigate();

  const [showspin, setShowSpin] = useState(true);
  const [spd, setSpd] = useState(new Date().toISOString().split('T')[0])

  const { id } = useParams();



  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }


  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }



  const userProfileGet = async () => {

    const response = await singleUsergetfunc(id);
console.log(response.data);
    if (response.status === 200) {
      setImgdata(response.data.profile)
      setInputData(response.data)
      setSpd(new Date(response.data.date).toISOString().split('T')[0])

    } else {
      console.log("error");
    }
  }


  //submit userdata
  const submitUserData = async (e) => {
    e.preventDefault();


    const { pName, category, stock, price } = inputdata;

    if (pName === "") {
      toast.error("Product name is Required !")
    } else if (category === "") {
      toast.error("Category is Required !")
    } else if (stock === "") {
      toast.error("Stock is Required !")

    } else if (price === "") {
      toast.error("Price is Required !")
    } else {

      const data = new FormData();
      data.append("pName", pName)
      data.append("category", category)
      data.append("stock", stock)
      data.append("price", price)
      data.append("product_image", image)
      data.append("spd", spd)


      const response = await editfunc(id, data);
      console.log(response.message);
      if (response.status === 200) {
        setUpdate(response.data)
        navigate("/inventory")
      }

    }
  }

  useEffect(() => {
    userProfileGet();
  }, [id])

  useEffect(() => {
    if (image) {
      setImgdata("")
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image]);

  const handleClose = () => {
    console.log("Clicked on handle close");
    navigate('/inventory')
  }

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container" style={{
          position: "relative",
          width: "50%",
          left: "5%"
        }}>
          <h2 className='text-center mt-1'>Update Product Details</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src={image ? preview : `${imgdata}`} alt="img" />
            </div>

            <Form>
              <Row>
                <Form.Group className=" col-lg-12" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name='spd' value={spd} onChange={(e) => setSpd(new Date(e.target.value).toISOString().split('T')[0])}  />
                </Form.Group>
                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Product name</Form.Label>
                  <Form.Control type="text" name='pName' value={inputdata.pName} onChange={setInputValue} placeholder='Enter Product Name' />
                </Form.Group>
                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" name='category' value={inputdata.category} onChange={setInputValue} placeholder='Enter Category' />
                </Form.Group>
                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="text" name='stock' value={inputdata.stock} onChange={setInputValue} placeholder='Enter Stock' />
                </Form.Group>
                <Form.Group className=" col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" name='price' value={inputdata.price} onChange={setInputValue} placeholder='Enter Price' />
                </Form.Group>
              </Row>

              <Form.Group className="mb-1 col-lg-12" controlId="formBasicEmail">
                <Form.Label>Choose Photo</Form.Label>
                <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Choose Photo' />
              </Form.Group>
              <div className='d-flex justify-content-end'>
                <Button variant="success" className='col-lg-3' style={{ marginRight: "8px" }} type="submit" onClick={submitUserData}>
                  Submit
                </Button>
                <Button variant="danger" className='col-lg-3' type="submit" onClick={handleClose} >
                  Cancel
                </Button>
              </div>

            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }

    </>
  )
}

export default Edit