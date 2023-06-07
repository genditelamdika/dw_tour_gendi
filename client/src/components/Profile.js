import React from "react";
import "react-bootstrap";
import { API } from '../config/api';
import { useContext, useEffect, useState } from "react";
// import The from "../image/Ellipse1.png"
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/css/detail-account.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from '../components/Footer'
import Historytrip from "./Historytrip";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

function Profile() {

  const [profileData,setProfil] = useState({});

  const getProfileData = async () => {
    try {
      const id = Number(localStorage.getItem("id"))
      const response = await API.get(`/user/${id}`);
      setProfil(response.data.data)
      console.log(profileData)
    }catch(error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getProfileData()
  },[])


    return (
      <>
      <div

        style={{ background:"E5E5E5",  height: "90.5vh", margin:"20px" }}
        className=" d-flex align-items-center justify-content-center">
        <div
        // className="bg-secondary"
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "5px",
            width: "40rem",
            border:"1px solid black",
          }}>
          <Row>
            <Col sm={6} style={{ marginTop: "-5px", paddingRight: "55px", }}>
              <>
                <h4 className="mb-5 text-dark" style={{fontWeight:"bold"}}>Personal Info</h4>
              </>
  
              <div className="d-flex mb-3">
              <img src={require( "../images/profile1.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-dark" style={{ fontSize: "" }}>
                  {profileData.fullname}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Full name
                  </p>
                </span>
              </div>
  
              <div className="d-flex mb-3">
              <img src={require( "../images/profile2.png")} className="me-3" style={{height:"30px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-dark" style={{ fontSize: "14px" }}>
                  {profileData.email}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Email
                  </p>
                </span>
              </div>
  
  
              <div className="d-flex mb-3 text-dark">
              <img src={require( "../images/profile3.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-dark" style={{ fontSize: "14px" }}>
                  {profileData.phone}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Mobile Phone
                  </p>
                
                </span>
              </div>
  
              <div className="d-flex mb-3">
              <img src={require( "../images/profile4.png")} className="me-3" style={{height:"40px"}}></img>
                <span style={{ marginTop: "-3px" }}>
                  <p className="text-dark" style={{ fontSize: "14px" }}>
                    jalan kaki di sawangan
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    Alamat
                  </p>
                </span>
              </div>
  
              
            </Col>
            <Col sm={6} style={{ paddingLeft: "10px" }}>
              <img
                src={require( "../images/profile.png" )}
                alt="Profile"
                style={{
                  width: "280px",
                  height: "345px",
                  borderRadius: "5px",
                  left:"838px",
                  top:"163px",
                }}></img>
              <button
                className=" mt-3"
                style={{ background: "#FFAF00", border: "none",
                position: "absolute;",
width: "280px",
height: "50px",
left: "838px",
top: "521px", }}>
                Change Photo Profile
              </button>{" "}
            </Col>
          </Row>
        </div>

      </div>
      <h1 style={{marginLeft:"200px", fontWeight:'bold'}}>History Trip</h1>
        <Historytrip/>

        
      </>
    );
  }
  
  export default Profile