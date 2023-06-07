import Minus from "../images/Minus.png"
import Plus from "../images/Plus.png"
import { Link, useNavigate } from 'react-router-dom';
import ihotel from "../images/ihotel.png"
import ilion from "../images/ilion.png"
import ieat from "../images/ieat.png"
import itime from "../images/itime.png"
import Footer from '../components/Footer'
import detail2 from '../images/detail2.png'
import detail3 from '../images/detail3.png'
import detail4 from '../images/detail4.png'
import icalendar from "../images/icalendar.png"
import { Button, Carousel } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import Swal from "sweetalert2";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { UserContext } from "../context/userContext";
function Detail() {
  
  const { id } = useParams();
  let { data: trip } = useQuery("tripCache", async () => {
    const response = await API.get(`/trip/${id}`);
    return response.data.data;
  });
  console.log("ini tripku", trip);

  console.log(id);

  // const [isAdmin] = useState(localStorage.getItem('isAdmin'));

  const [counterqty, setJumlahProduk] = useState(1);
  const [total, setTotalHarga] = useState(0);
    const [index, setIndex] = useState(0); //untuk carausel
    const [state, setState] = useContext(UserContext)
    console.log("datauser:",state)
    
  //   //Alert
    const MySwal = withReactContent(Swal);
    let navigate = useNavigate();
    const handleButtonClick = () => {
    MySwal.fire({
    title: <strong>Add Book Success</strong>,
    html: <i>You clicked the button!</i>,
    icon: 'success'
    })
        // navigate("/Pay");
  };


    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };


    const tambahJumlahProduk = () => {
      setJumlahProduk(counterqty + 1);
    };
    const kurangiJumlahProduk = () => {
      if (counterqty > 1) {
        setJumlahProduk(counterqty - 1);
      }
    };
    // const postDataMutation = useMutation((data) => API.post('/transaction', data));

    
    const [form, setForm] = useState({
      total: total,
      counterqty: counterqty,
      status:"waiting payment",
      tripid: parseInt(id),
      userid:state.user.id
      
    }) //Store product data
    
    useEffect(() => {
      const calculateTotalHarga = () => {
        setTotalHarga(trip?.price * counterqty);
      };
      
      calculateTotalHarga();
      setForm({
        ...form,
        total: total,
        counterqty: counterqty
      });
    }, [trip, counterqty]);
    
    console.log("dataformdet", form)

    const handleSubmit= useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        const data = {
          total: total,
      counterqty: counterqty,
      // status:"pendding",
      tripid: parseInt(id),
      // userid:state.user.id
        };
  
        const body = JSON.stringify(data);
  
        const response = await API.post('/transaction', body, config);
        console.log("transaction success :", response)
        const token = response.data.data.token;
        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
  
        // code here
      } catch (error) {
        console.log("transaction failed : ", error);
      }
    });

    useEffect(() => {
      //change this to the script source you want to load, for example this is snap.js sandbox env
      const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
      //change this according to your client-key
      const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    
      let scriptTag = document.createElement("script");
      scriptTag.src = midtransScriptUrl;
      // optional if you want to set script attribute
      // for example snap.js have data-client-key attribute
      scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    
      document.body.appendChild(scriptTag);
      return () => {
        document.body.removeChild(scriptTag);
      };
    }, []);
    // const mutation = useMutation((jsonData) => API.post("/transaction", jsonData,{
    //   Authorization:"Bearer " + localStorage.token
    // }));
    // const handleSubmit = async () => {
    //   const jsonData = ({
    //     total: form.total,
    //     counterqty: form.counterqty,
    //     status: form.status,
    //     tripid: form.tripid,
    //     userid: form.userid 
    //   });
    //   // navigate("/Pay:/id")
  
    //   try {
    //     await mutation.mutateAsync(jsonData);
    //     // alert("Transaksi berhasil!");
    //     // MySwal.fire({
    //     //   title: <strong>Add Book Success</strong>,
    //     //   html: <i>You clicked the button!</i>,
    //     //   icon: 'success'
    //     //   })
    //     // navigate(`/Pay/${id}`)
    //     console.log("Transaction success!");
    //   } catch (error) {
    //     alert("Gagal berhasil!");
    //     console.log("Transaction failed: ", error);
    //   }
    // };



    useEffect(() => {
      // Simpan useridHarga di localStorage setiap kali berubah
      localStorage.setItem('total', JSON.stringify(total));
      localStorage.setItem('counterqty', JSON.stringify(counterqty));
    }, [total, counterqty]);


      return(
        <>
        <h1 style={{ marginLeft:"150px", marginTop:"50px",fontFamily:"Avenir",fontWeight:"bolder" }}>{trip?.title} </h1>
        <h1 style={{ marginLeft:"150px", marginTop:"10px",size:"24px", color:"#A8A8A8"}}>{trip?.country.name}</h1>
        
        <Carousel activeIndex={index} onSelect={handleSelect} style={{marginTop:"50px",width:"80%", marginLeft:"150px", }}>
      <Carousel.Item>
        <img
        style={{height:"400px"}}
          className="d-block w-100"
          src={trip?.image}
          alt="First slide"
        />
        <div style={{marginTop:"20px"}}>
        <img src={detail2} alt="gambar"></img>
    <img style={{marginLeft:"45px"}} src={detail3} alt="gambar"></img>
    <img style={{marginLeft:"45px"}} src={detail4} alt="gambar"></img>
    </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
                style={{height:"400px"}}
          className="d-block w-100"
          src={trip?.image}
          alt="Second slide"
        />
        <div style={{marginTop:"20px"}}>
    <img src={detail3} alt="gambar"></img>
    <img style={{marginLeft:"45px"}} src={detail4} alt="gambar"></img>
    <img style={{marginLeft:"45px"}} src={detail2} alt="gambar"></img>
    </div>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{height:"400px"}}
          className="d-block w-100" 
          src={trip?.image}
          alt="Third slide"
        />
        <div style={{marginTop:"20px"}}>
    <img src={detail3} alt="gambar"></img>
    <img style={{marginLeft:"45px"}} src={detail4} alt="gambar"></img>
    <img style={{marginLeft:"45px"}} src={detail2} alt="gambar"></img>
    </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <h1 style={{ marginLeft:"150px", marginTop:"50px" }}>Information Trip</h1>
    <div className="flex" style={{marginLeft:"150px"}}>
      <div>
      <p style={{color:"#A8A8A8"}}>acomodation</p>
      <div className="flex">
      <img style={{height:"30px"}} src={ihotel}/>
      <h3 style={{fontSize:"20px", width:"180px", fontWeight:"bold", height: "33px",fontFamily: 'Avenir',alignItems:"center"}}> {trip?.acommodation}</h3>
      </div>

      </div>
      <div style={{marginLeft:"20px"}}>
      <p style={{ color:"#A8A8A8"}}>Tranformation</p>
      <div className="flex">
      <img style={{height:"30px"}} src={ilion}/>
        <h3 style={{fontSize:"20px",width:"180px", fontWeight:"bold", height: "33px",fontFamily: 'Avenir',alignItems:"center"}} >{trip?.transportasion}</h3>
      </div>
      </div>
      <div style={{marginLeft:"20px"}}>
      <p style={{ color:"#A8A8A8"}}>Eat</p>
      <div className="flex">
      <img style={{height:"30px"}} src={ieat}/>
        <h3 style={{fontSize:"20px", fontWeight:"bold",width:"180px", height: "33px",fontFamily: 'Avenir',alignItems:"center"}} >{trip?.eat}</h3>
      </div>
      </div>
      

      <div style={{marginLeft:"20px"}}>
      <p style={{ color:"#A8A8A8"}}>Time Date</p>
      <div className="flex">
      <img style={{height:"30px"}} src={icalendar}/>
      <h3 style={{fontSize:"20px", fontWeight:"bold", height: "33px",fontFamily: 'Avenir',alignItems:"center"}}>{trip?.day} Day </h3>
      <h3 style={{fontSize:"20px", fontWeight:"bold", height: "33px",fontFamily: 'Avenir'}}>{trip?.night} Night</h3>
      </div>
      </div>

      <div style={{marginLeft:"20px"}}>
      <p style={{ color:"#A8A8A8"}}>Duration</p>
      <div className="flex">
      <img style={{height:"30px"}} src={itime}/>
        <h3 style={{fontSize:"20px", fontWeight:"bold", height: "33px",fontFamily: 'Avenir',alignItems:"center"}} >{trip?.datetrip}</h3>
      </div>
      </div>
 
    </div>

    <h1 style={{marginLeft:"150px"}}>Description</h1>
    <p style={{marginLeft:"150px"}}>{trip?.description}</p>

    <div className="flex" style={{marginLeft:"150px"}}>
    <h1 style={{color:"#FFAF00" , fontWeight:"bold", height: "33px",fontFamily: 'Avenir'}}>IDR.{trip?.price}</h1>
    <h1>/Person</h1>
    <Button style={{marginLeft:"580px",background:"#e5e5e5",border:"none",height:"50px",fontWeight:"bold",fontFamily:"avenir"}}  onClick={kurangiJumlahProduk}>
      <img style={{height:"50px"}} src={Minus}/>
      </Button> 
    <h2 style={{marginTop:"8px"}}> {counterqty}</h2>
    <Button style={{marginLeft:"0px",background:"#e5e5e5",height:"50px",border:"none"}}  onClick={tambahJumlahProduk}>
    <img style={{height:"50px"}} src={Plus}/>
    </Button>
    </div>

    <div style={{margin: "150px", marginTop:"0",marginBottom:"0"}}>
    <hr style={{ borderTop: "2px solid black" }} />
    </div>

    <div className="flex">
      <h1 style={{marginLeft:"150px"}}>Total</h1>
      {/* <h2>Total Harga: {totalHarga}</h2> */}
      <h1 style={{color:"#FFAF00",marginLeft:"650px", fontWeight:"bold", height: "33px",fontFamily: 'Avenir'}}>IDR.{total} </h1>
    </div>

    <div style={{margin: "150px", marginTop:"0",marginBottom:"0"}}>
    <hr style={{ borderTop: "2px solid black" }} />
    </div>
    { state.isLogin ? (

  <Button  onClick={(e) => handleSubmit.mutate(e)} type="submit"  style={{
    marginLeft:"1000px",
    width: "213px",
    height: "50px",
    left: "1016px",
    top: "1284px",
    background:" #FFAF00",
    borderRadius:"5px",   
  }}>Book</Button>
   
  ) : (
    <div></div>
  )
}


<div style={{paddingTop:"100px"}}>
          <Footer/>

            </div>

        
        </>

    )
}
export default Detail