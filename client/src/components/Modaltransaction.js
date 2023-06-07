import React from 'react';
import Icon from "../images/Icon.png"
import qrcode from "../images/qrcode.png"
import { Modal, Button } from 'react-bootstrap';
import Historytrip from './Historytrip';
const Modaltransaction = ({ show, onHide,data, onClose, onApprove  }) => {
console.log("transsssssss",data)
// console.log("transid",transactionid)
    return (
      <Modal className="Mtran" show={show} onHide={onHide} centered>
          <div   
              className=" d-flex align-items-center justify-content-center"
              >
                <div

          style={{
            background: "white",
            width: "60rem",
            
          }}>
            <div className="flex">
                <img src={Icon}></img>
                <h1 style={{marginLeft:"490px",fontSize:"36px", weight:"bolder",color:"black"}}>Boking</h1>
            </div>
            <div className="flex">
                <h1 style={{ marginLeft:"630px",height:"29px",fontSize:"20px",color:"#959595"}}>Saturday, 22 Juy 2020</h1>

            </div>
            <div className="flex">
                <h3 style={{fontSize:"25px",fontFamily:"Avenir",fontWeight:"bold",color:"black"}}>{data?.trip?.title}</h3>
                <h4 style={{marginLeft:"30px", fontSize:"20px",marginTop:"5px",fontFamily:"Avenir",fontWeight:"bold",color:"black"}}>Date Trip</h4>
                <h4 style={{marginLeft:"80px", fontSize:"20px", marginTop:"5px",fontFamily:"Avenir",fontWeight:"bold",color:"black"}}>Duration</h4>
            </div>
            <div className="flex">
                <p style={{color:"#959595",marginLeft:"20px"}}>{data?.trip?.country?.name}</ p>
                <p style={{marginLeft:"240px",color:"#959595"}}>26 Agustus 2022</p>
                <p style={{marginLeft:"50px",color:"#959595"}}>6 Day 4 Night</p>
            <img style={{position:"absolute",marginLeft:"680px"}} src={qrcode}></img>
            </div>
            <div className="flex">
                <p style={{color: "green", paddingTop:"10px",fontFamily:"Avenir",fontWeight:"bold",color:"black",marginLeft:"20px"}}>Approve</p>
                <h4 style={{marginLeft:"250px",  fontSize:"20px",fontFamily:"Avenir",fontWeight:"bold",color:"black"}}>Acomadation</h4>
                <h4 style={{marginLeft:"50px",  fontSize:"20px",fontFamily:"Avenir",fontWeight:"bold",color:"black"}}>Transportasion</h4>
            </div>

            <div className="flex">
                <p style={{marginLeft:"310px",color:"#959595"}}>Hotel 4 Nights</p>
                <p style={{marginLeft:"60px",color:"#959595"}}>Qatar Airways</p>
            </div>
            <div className="flex" >
                <p >No</p>
                <p style={{marginLeft:"40px",fontWeight:"bold",color:"black"}}>Fullname</p>
                <p style={{marginLeft:"40px",fontWeight:"bold",color:"black"}}>Genderr</p>
                <p style={{marginLeft:"40px",fontWeight:"bold",color:"black"}}>Phone</p>
            </div>
            <div style={{ marginTop:"0",marginBottom:"0" }}>
                <hr style={{ borderTop: "3px solid black" }} />
            </div>
            <div className="flex">
            <p style={{marginLeft:"30px",color:"#959595"}}> {data?.id}</p>
        {/* <p>User Email: {selectedTransactionEmail}</p> */}

                {/* <p>1</p>
                <p style={{marginLeft:"30px",color:"#959595"}}>Gendi Telamdika</p> */}
                <p  style={{marginLeft:"30px",color:"#959595"}}>{data?.user?.email}</p>
                <p  style={{marginLeft:"30px",color:"#959595"}}>{data?.user?.phone}</p>
                <h3  style={{marginLeft:"200px",fontWeight:"bold",color:"black"}}>Qty</h3>
                <h3  style={{marginLeft:"50px",fontWeight:"bold",color:"black"}}>:</h3>
                <h3  style={{marginLeft:"40px",fontWeight:"bold",color:"black"}}>{data?.counterqty}</h3>
            </div>
            <div style={{ marginTop:"0",marginBottom:"0" }}>
                <hr style={{ borderTop: "3px solid black" }} />
            </div>
            <div className="flex">
                <h3 style={{marginLeft:"530px",fontWeight:"bold",color:"black"}}>TOTAL</h3>
                <h3 style={{marginLeft:"10px",fontWeight:"bold",color:"black"}}>:</h3>
                <h3  style={{marginLeft:"30px",fontWeight:"bold",color:"red"}}>IDR{data?.total}</h3>
            </div>

            <div className='flex'>
                <Button style={{marginLeft:"660px",width:"80px",background:"red",marginBottom:"10px"}}>Cancel</Button>
                <Button onClick={onApprove} style={{marginLeft:"20px",background:"green",width:"80px",marginBottom:"10px"}}>Approve</Button>
            </div>



            </div>

          </div>
          {/* </div> */}
        
      </Modal>
    );
  };
  export default Modaltransaction
  