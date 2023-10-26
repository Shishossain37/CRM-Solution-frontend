import React, { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import { useParams } from 'react-router-dom'
import Spiner from "../../components/Spiner/Spiner"
import { singleUsergetfunc } from "../../services/Apis"
import { BASE_URL } from '../../services/helper'
import moment from "moment"
import "./viewphoto.css"

const ViewPhoto = () => {

  const [productProfile, setproductProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();

  const productProfileGet = async () => {
    const response = await singleUsergetfunc(id);

    if (response.status === 200) {
      setproductProfile(response.data)
    } else {
      console.log("error");
    }
  }


  useEffect(() => {
    productProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])
  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">

          <div className="card-profile-stats d-flex justify-content-center">
            {/* <img src={`${BASE_URL}/uploads/${productProfile.profile}`} alt="" /> */}
            <img src={productProfile?.profile} alt="img" />

          </div>



        </div>
      }

    </>
  )
}

export default ViewPhoto