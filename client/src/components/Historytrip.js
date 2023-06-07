import Icon from "../images/Icon.png"
import bukti from "../images/bukti.png"
import "react-bootstrap";
import qrcode from "../images/qrcode.png"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Footer from "./Footer";
import { API } from "../config/api";
import { useEffect, useState } from "react";

function Historytrip() {
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
    const { id } = useParams();
    let { data: usertrans } = useQuery("usertransCache", async () => {
      const id = Number(localStorage.getItem("id"))
      const response = await API.get(`/user/${id}/transaction`);
      return response.data.data;
    });
    console.log("transactionptof", usertrans)
    return(
        <>
            <div
            style={{ background:"E5E5E5",  height: "90.5vh", margin:"20px",}}
              className=" align-items-center justify-content-center">

          {usertrans?.map((item) => (        
                <div
        //   className="bg-secondary"
          style={{
            background: "white",
            padding: "15px",
            margin:"50px",
            borderRadius: "5px",
            width: "60rem",
            height:"500px",
            borderColor:"red",
            marginLeft:"200px"
            // border:" 1px solid"
            
          }}>
            <div className="flex">
                <img src={Icon}></img>
                <h1 style={{marginLeft:"490px",fontSize:"36px", weight:"bolder"}}>Boking</h1>
            </div>
            <div className="flex">
                <h1 style={{ marginLeft:"630px",height:"29px",fontSize:"20px",color:"#959595"}}>Saturday, 22 Juy 2020</h1>

            </div>
            <div className="flex">
                <h3 style={{fontSize:"25px",fontFamily:"Avenir",fontWeight:"bold"}}>{item.trip.title}</h3>
                <h4 style={{marginLeft:"30px", fontSize:"20px",marginTop:"5px",fontFamily:"Avenir",fontWeight:"bold"}}>Date Trip</h4>
                <h4 style={{marginLeft:"80px", fontSize:"20px", marginTop:"5px",fontFamily:"Avenir",fontWeight:"bold"}}>Duration</h4>
            </div>
            <div className="flex">
                <p style={{color:"#959595"}}>{item.trip.country.name}</ p>
                <p style={{marginLeft:"240px",color:"#959595"}}>{item.trip.datetrip}</p>
                <p style={{marginLeft:"50px",color:"#959595"}}>6 Day 4 Night</p>
            <img style={{position:"absolute",marginLeft:"680px"}} src={qrcode}></img>
            </div>
            <div className="flex">
                <p style={{color: "green", paddingTop:"10px",fontFamily:"Avenir",fontWeight:"bold"}}>Approve</p>
                <h4 style={{marginLeft:"250px",  fontSize:"20px",fontFamily:"Avenir",fontWeight:"bold"}}>Acomadation</h4>
                <h4 style={{marginLeft:"50px",  fontSize:"20px",fontFamily:"Avenir",fontWeight:"bold"}}>Transportasion</h4>
            </div>

            <div className="flex">
                <p style={{marginLeft:"310px",color:"#959595"}}>{item.trip.acommodation}</p>
                <p style={{marginLeft:"60px",color:"#959595"}}>{item.trip.transportasion}</p>
                <p style={{marginLeft:"130px",fontFamily:"Avenir",fontWeight:"bold",marginTop:"20px"}}>1518A29</p>
            </div>
            <div className="flex" >
                <p >No</p>
                <p style={{marginLeft:"40px",fontWeight:"bold"}}>Fullname</p>
                <p style={{marginLeft:"40px",fontWeight:"bold"}}>Genderr</p>
                <p style={{marginLeft:"40px",fontWeight:"bold"}}>Phone</p>
            </div>
            <div style={{ marginTop:"0",marginBottom:"0" }}>
                <hr style={{ borderTop: "3px solid black" }} />
            </div>
            <div className="flex">
                <p>1</p>
                <p style={{marginLeft:"30px",color:"#959595"}}>{profileData.fullname}</p>
                <p  style={{marginLeft:"30px",color:"#959595"}}>Man</p>
                <p  style={{marginLeft:"30px",color:"#959595"}}>{profileData.phone}</p>
                <h3  style={{marginLeft:"200px",fontWeight:"bold"}}>Qty</h3>
                <h3  style={{marginLeft:"50px",fontWeight:"bold"}}>:</h3>
                <h3  style={{marginLeft:"40px",fontWeight:"bold"}}>{item.counterqty}</h3>
            </div>
            <div style={{ marginTop:"0",marginBottom:"0" }}>
                <hr style={{ borderTop: "3px solid black" }} />
            </div>
            <div className="flex">
                <h3 style={{marginLeft:"530px",fontWeight:"bold"}}>TOTAL</h3>
                <h3 style={{marginLeft:"10px",fontWeight:"bold"}}>:</h3>
                <h3  style={{marginLeft:"30px",fontWeight:"bold",color:"red",paddingBottom:"200px"}}>IDR.{item.total}</h3>
            </div>
            </div>
            ))}
            <Footer />

          </div>
        </>
    )
}
export default Historytrip