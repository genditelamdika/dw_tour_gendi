// import The from "../image/thewitcher.png"
import Vector1 from "../images/Vector1.png";
import Vector2 from "../images/Vector2.png";
import Vector3 from "../images/Vector3.png";
import Vector4 from "../images/Vector4.png";
import Cards from "./cards";
import Props from "./Props";
import Footer from "../components/Footer";

import { Col, Container, Image, InputGroup, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Card from "react-bootstrap/Card";
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

// import ExampleForm from "/hooks/ExampleForm";
function Home() {
  // const Tour = {
  //   TR : {
  //     tr1: {
  //       id:1,
  //       images:"Rectangle1",
  //       title:"6D/4N Fun Tessie",
  //       negara:"Australia",
  //       idr:"12.398.00",
  //       quote:"15/15"
  //     },
  //     tr2: {
  //       id:2,
  //       title:"6D/4N Exciting Summer in ...",
  //       images:"Rectangle2",
  //       negara:"South Korea",
  //       idr:"12.398.00",
  //       quote:"12/15"
  //     },
  //     tr3: {
  //       id:3,
  //       title:"8D/6N Wonderful Autum ...",
  //       images:"Rectangle3",
  //       negara:"Japan",
  //       idr:"12.398.00",
  //       quote:"12/15"
  //     },
  //     tr4: {
  //       id:4,
  //       title:"4D/3N Overland Jakarta B...",
  //       images:"Rectangle4",
  //       negara:"Indonesia",
  //       idr:"12.398.00",
  //       quote:"12/15"
  //     },
  //     tr5: {
  //       id:5,
  //       title:"4D/3N Labuan Bajo Delight",
  //       images:"Rectangle5",
  //       negara:"Indonesia",
  //       idr:"12.398.00",
  //       quote:"11/15"
  //     },
  //     tr6: {
  //       id:6,
  //       title:"4D/3N Overland Jakarta B...",
  //       images:"Rectangle6",
  //       negara:"Japanese",
  //       idr:"12.398.00",
  //       quote:"10/15",
  //     },

  //   }

  // }
  let { data: trips } = useQuery("tripsChache", async () => {
    const response = await API.get("/trips");
    console.log("data :", response.data);
    return response.data.data;
  });
  console.log(trips)

  return (
    <div className="bg">
      <div className="the">
        <h1 style={{ fontSize: "100px", color: "white" }}>Explore</h1>
        <p style={{ fontSize: "50px", color: "white" }}>
          Your Amazing City Together
        </p>
        <div></div>
        {/* <Stack direction="horizontal"> */}

        <p>Find great place to holiday</p>
        <Button
          style={{
            position: "absolute",
            marginLeft: "900px",
            height: "35px",
            width: "80px",
          }}
          variant="warning"
        >
          Search
        </Button>
        <Form.Control
          style={{ width: "900px" }}
          className=""
          type="search"
          placeholder="Add your item here..."
        />
      </div>
      <img
        className="kontol"
        style={{
          position: "fixed",
          position: "absolute",
          zIndex: -1,
          top: "0",
          width: "100%",
        }}
        src={require("../images/pantai.png")}
        alt="gambar"
      ></img>

      <div>
        <div className="card-group">
          <Cards icon={Vector2} title="Best Price Guarantee" />
          <Cards icon={Vector3} title="Travellers Love Us" />
          <Cards icon={Vector1} title="Best Travel Agent" />
          <Cards icon={Vector4} title="Our Dedicated Support" />
          <div style={{ marginLeft: "0px", padding: "50px" }}>
            {/* <Props className="text-decoration-none" value={Tour}/> */}
            <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
              Group Tour
            </h1>
          </div>
          {/* <Row
            xs={3}
            md={3}
            className="g-3"
            style={{ marginTop: "0px", marginLeft: "0px",padding:"50px" }}
          >
            {trips?.map((item, idx) => (
              <Link className="text-decoration-none " to={`/Detail/${item.id}`}>
                <Col key={idx} >
                  <Card style={{ padding:"30px" }}>
                  <p className="text-decoration-none" style={{marginLeft:"290px",marginTop:"30px",position:"absolute",background:"white",borderRadius:"5px 0 0 5px",textAlign:"center",width:"50px",height:"30px"}}>0/{item.quota}</p>
                    <Card.Img variant="dark" src={item.image} />
                    <Card.Body>
                      <Card.Title style={{ color: "black" }}>
                        {item.title}
                      </Card.Title>
                      <div className="flex" style={{marginTop:"10px"}}>

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
                        fontSize:"14px",
                        marginLeft:"200px",
                        color:"yellow",
                      }}
                      >
                        IDR.{item.price}
                      </Card.Title>

                        </div>

                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            ))}
          </Row> */}
        </div>
        <div style={{marginTop:"700px"}}>
           <Row
            xs={3}
            md={3}
            className="g-3"
            style={{ marginTop: "0px", marginLeft: "0px",padding:"50px" }}
          >
            {trips?.map((item, idx) => (
              <Link className="text-decoration-none " to={`/Detail/${item.id}`}>
                <Col key={idx} >
                  <Card style={{ padding:"30px" }}>
                  <p className="text-decoration-none" style={{marginLeft:"290px",marginTop:"30px",position:"absolute",background:"white",borderRadius:"5px 0 0 5px",textAlign:"center",width:"50px",height:"30px"}}>0/{item.quota}</p>
                    <Card.Img variant="dark" src={item.image} />
                    <Card.Body>
                      <Card.Title style={{ color: "black" }}>
                        {item.title}
                      </Card.Title>
                      <div className="flex" style={{marginTop:"10px"}}>

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
                        fontSize:"14px",
                        marginLeft:"200px",
                        color:"yellow",
                      }}
                      >
                        IDR.{item.price}
                      </Card.Title>

                        </div>

                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            ))}
          </Row>
        </div>
        <div style={{ paddingTop: "1650px" }}>
          <Footer style={{ marginTop: "800px" }} />
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}
export default Home;
