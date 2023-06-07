import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import Footer from "../components/Footer";
import Addcountry from "../pages/Addcountry"
// import Card from "react-bootstrap/Card";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Vector1 from "../images/Rectangle1.png";
import Props from "./Props";
import { useEffect, useState } from "react";

function Trip() {
  let navigate = useNavigate();
  const [countrys, setCountry] = useState(null);
  const [deleteid, setDelete] = useState(null);

  const handleDelete = (e) => {
    e.preventDefault();
    const btnvalue = e.target.value;
    setDelete(Number(btnvalue));
  };
  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/Addtrip")
  }
  let { data: trips, refetch } = useQuery("tripsChache", async () => {
    const response = await API.get("/trips");
    console.log("data :", response.data);
    return response.data.data;
  });
  const getCountry = async () => {
    try {
      const response = await API.get("/countrys");
      setCountry(response.data.data);
      console.log("country", response);
    } catch (error) {
      console.log(error);
    }
  };

  const deletebyId = useMutation(async (id) => {
    try {
      await API.delete(`/trip/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    deletebyId.mutate(deleteid);
  }, [deleteid]);

  // const Tour = {
  //     TR : {
  //       tr1: {
  //         id:1,
  //         images:"Rectangle1",
  //         title:"6D/4N Fun Tessie",
  //         negara:"Australia",
  //         idr:"12.398.00",
  //         quote:"12/15",
  //       },
  //       tr2: {
  //         id:2,
  //         title:"6D/4N Exciting Summer in ...",
  //         images:"Rectangle2",
  //         negara:"South Korea",
  //         idr:"12.398.00",
  //         quote:"10/15"
  //       },
  //       tr3: {
  //         id:3,
  //         title:"8D/6N Wonderful Autum ...",
  //         images:"Rectangle3",
  //         negara:"Japan",
  //         idr:"12.398.00",
  //         quote:"15/15"
  //       },
  //       tr4: {
  //         id:4,
  //         title:"4D/3N Overland Jakarta B...",
  //         images:"Rectangle4",
  //         negara:"Indonesia",
  //         idr:"12.398.00",
  //         quote:"11/15"
  //       },
  //       tr5: {
  //         id:5,
  //         title:"4D/3N Labuan Bajo Delight",
  //         images:"Rectangle5",
  //         negara:"Indonesia",
  //         idr:"12.398.00",
  //         quote:"14/15"
  //       },
  //       tr6: {
  //         id:6,
  //         title:"4D/3N Overland Jakarta B...",
  //         images:"Rectangle6",
  //         negara:"Japan",
  //         idr:"12.398.00",
  //         quote:"14/15"
  //       },

  //     }

  //   }
  return (
    <>
      <div style={{ background: "#E5E5E5" }}>
        <div className="flex">
          <h1
            style={{
              fontFamily: "avenir",
              fontWeight: "bold",
              marginTop: "30px",
              marginLeft: "100px",
            }}
          >
            Income Trip
          </h1>
          <h1 style={{position:"absolute",marginLeft:"800px",marginTop:"50px"}}>
              <Addcountry />
            </h1>
          {/* <Link to="/Addtrip"> */}
            <Button onClick={handleAdd} 
              style={{
                marginLeft: "730px",
                marginTop: "50px",
                width: "213px",
                height: "50px",
                // left: "1016px",
                // top: "1284px",
                background: " #FFAF00",
                borderRadius: "5px",
              }}
            >
              Add Trip
            </Button>
            
          {/* </Link> */}
        </div>

        <Row
          xs={3}
          md={3}
          className="g-3"
          style={{ marginTop: "0px", marginLeft: "0px", padding: "50px" }}
        >
          {trips?.map((item, idx) => (
            <Col key={idx}>
                <Card style={{ padding: "30px" }}>
                  <p
                    className="text-decoration-none"
                    style={{
                      marginLeft: "290px",
                      marginTop: "30px",
                      position: "absolute",
                      background: "white",
                      borderRadius: "5px 0 0 5px",
                      textAlign: "center",
                      width: "50px",
                      height: "30px",
                    }}
                  >
                    {item.quota}
                  </p>
                  <Card.Img variant="dark" src={item.image} />
                <Link className="text-decoration-none " to={`/Detail/${item.id}`}>
                  <Card.Body>
                    <Card.Title style={{ color: "black" }}>
                      {item.title}
                    </Card.Title>
                    <div className="flex" style={{ marginTop: "10px" }}>
                      <Card.Title
                        style={{
                          fontSize: "14px",
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#555555",
                        }}
                      >
                        {item.country.name}
                      </Card.Title>
                      <Card.Title
                        style={{
                          fontSize: "14px",
                          marginLeft: "200px",
                          color: "yellow",
                        }}
                      >
                        IDR.{item.price}
                      </Card.Title>
                    </div>
                  </Card.Body>
            </Link>
                  <Card.Body>
                    <button onClick={handleDelete} type="buton" className="shadow  btn btn-danger fw-bold  " style={{width:"70px"}} name={item.id} value={item.id}>kontol doni</button>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
        {/* <div style={{marginLeft:"100px"}}>
    <Props className="text-decoration-none" value={Tour}/>
    </div> */}

        <div style={{ paddingTop: "500px" }}>
          <Footer style={{ marginTop: "800px" }} />
        </div>
      </div>
    </>
  );
}

export default Trip;
