import Icon from "../images/Icon.png"
import bukti from "../images/bukti.png"
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import "react-bootstrap";
import Footer from '../components/Footer'
import Modalpay from '../components/Modalpay'
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
function Pay() {
  const [totalHarga, setTotalHarga] = useState(0);
  const [jumlahProduk, setJumlahProduk] = useState(0);
    const [showModal, setShowModal] = useState(false);
   
    useEffect(() => {
      // Mengambil data totalHarga dari localStorage saat komponen Detail dipasang
      const savedTotalHarga = localStorage.getItem('total');
      const savedJumlahProduk = localStorage.getItem('counterqty');
      
      // Memastikan data totalHarga yang diambil adalah string dan mengkonversikannya kembali ke nilai number
      if (savedTotalHarga) {
        setTotalHarga(parseInt(savedTotalHarga, 10));
        setJumlahProduk(parseInt(savedJumlahProduk, 10));
      }
    }, []);


    const handleModalShow = () => {
      setShowModal(true);
    };
  
    const handleModalHide = () => {
      setShowModal(false);
    };
    
    const [state, setState] = useContext(UserContext)
    // const [login, setLogin] = useState(false);
    // console.log("datauser:",state)
  
    const [profile, setProfile] = useState({})
  
    const { id } = useParams();
    // fetching profile by id from state
    const getProfileData = async () => {
      try {
        const response = await API.get(`/user/${state.user.id}`)
        setProfile(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    console.log('profiledataaaaaa',state)
  
    useEffect(() => {
      getProfileData()
    }, [])

    // useEffect(() => {
    //   const savedTotalHarga = localStorage.getItem('total');
    //   const savedJumlahProduk = localStorage.getItem('counterqty');
  
    //   if (savedTotalHarga && savedJumlahProduk) {
    //     const data = {
    //       totalHarga: parseInt(savedTotalHarga, 10),
    //       jumlahProduk: parseInt(savedJumlahProduk, 10),
    //     };
    //     mutate(data);
    //   }
    // }, []);

    // const postTransaction = async (data) => {
    //   try {
    //     const response = await API.post('/transaction', data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // const { mutate } = useMutation(postTransaction);
  
    // const handleButtonClick = () => {
    //   const savedTotalHarga = localStorage.getItem('total');
    //   const savedJumlahProduk = localStorage.getItem('counterqty');
  
    //   if (savedTotalHarga && savedJumlahProduk) {
    //     const data = {
    //       totalHarga: parseInt(savedTotalHarga, 10),
    //       jumlahProduk: parseInt(savedJumlahProduk, 10),
    //     };
    //     mutate(data);
    //   }
    // };
  

    // const { id } = useParams();
  // let { data: usertrans, refetch } = useQuery("usertransCache", async () => {
  //   const response = await API.get(`/user/${id}/transaction`);
  //   return response.data.data;
  // });
  // console.log("tansaction",usertrans)
  let { data: trip } = useQuery("tripCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });


  
    return(
        <>
            <div
            style={{ background:"E5E5E5",  height: "90.5vh", margin:"20px"}}
              className=" d-flex align-items-center justify-content-center">
                <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "5px",
            width: "60rem",
            height:"500px",
            borderColor:"red",
            border:" 1px solid"
            
          }}>
            <div className="flex">
                <img src={Icon}></img>
                <h1 style={{marginLeft:"490px",fontSize:"36px", weight:"bolder"}}>Boking</h1>
            </div>
            <div className="flex">
                <h1 style={{ marginLeft:"630px",height:"29px",fontSize:"20px",color:"#959595"}}>Saturday, 22 Juy 2020</h1>

            </div>
            <div className="flex">
                <h3 style={{fontSize:"25px",fontFamily:"Avenir",fontWeight:"bold"}}>6D/4N Fun Tassie Vacation</h3>
                <h4 style={{marginLeft:"30px", fontSize:"20px",marginTop:"5px",fontFamily:"Avenir",fontWeight:"bold"}}>Date Trip</h4>
                <h4 style={{marginLeft:"80px", fontSize:"20px", marginTop:"5px",fontFamily:"Avenir",fontWeight:"bold"}}>Duration</h4>
            </div>
            <div className="flex">
                <p style={{color:"#959595"}}>{trip?.country.name}</ p>
                <p style={{marginLeft:"240px",color:"#959595"}}>{trip?.datetrip}</p>
                <p style={{marginLeft:"50px",color:"#959595"}}>{trip?.day} Day {trip?.night} Night</p>
            <img style={{position:"absolute",marginLeft:"680px",border:"black 1px solid"}} src={bukti}></img>
            </div>
            <div className="flex">
                <p style={{color: "red", paddingTop:"10px",fontFamily:"Avenir",fontWeight:"bold"}}>Waiting Payment</p>
                <h4 style={{marginLeft:"200px",  fontSize:"20px",fontFamily:"Avenir",fontWeight:"bold"}}>Acomadation</h4>
                <h4 style={{marginLeft:"50px",  fontSize:"20px",fontFamily:"Avenir",fontWeight:"bold"}}>Transportasion</h4>
            </div>

            <div className="flex">
                <p style={{marginLeft:"300px",color:"#959595"}}>{trip?.acommodation}</p>
                <p style={{marginLeft:"60px",color:"#959595"}}>{trip?.transportasion}</p>
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
                <p style={{marginLeft:"60px",color:"#959595"}}>{profile?.fullname}</p>
                <p  style={{marginLeft:"80px",color:"#959595"}}>Man</p>
                <p  style={{marginLeft:"60px",color:"#959595"}}>{profile?.phone}</p>
                <h3  style={{marginLeft:"200px",fontWeight:"bold"}}>Qty</h3>
                <h3  style={{marginLeft:"50px",fontWeight:"bold"}}>:</h3>
                <h3  style={{marginLeft:"40px",fontWeight:"bold"}}>{jumlahProduk}</h3>
            </div>
            <div style={{ marginTop:"0",marginBottom:"0" }}>
                <hr style={{ borderTop: "3px solid black" }} />
            </div>
            <div className="flex">
                <h3 style={{marginLeft:"530px",fontWeight:"bold"}}>TOTAL</h3>
                <h3 style={{marginLeft:"10px",fontWeight:"bold"}}>:</h3>
                <h3  style={{marginLeft:"30px",fontWeight:"bold",color:"red"}}>{totalHarga}</h3>
            </div>
            <div>
            <Button type="button" onClick={handleModalShow} style={{
      marginLeft:"730px",
      marginTop:"50px",
      width: "213px",
      height: "50px",
      left: "1016px",
      top: "1284px",
      background:" #FFAF00",
      borderRadius:"5px"
    
    }}>PAY</Button>
            </div>
            <Modalpay show={showModal} onHide={handleModalHide}/>
       



            </div>

          </div>
            <div style={{paddingTop:"100px"}}>
          <Footer/>
        </div>
        </>
    )
}
export default Pay