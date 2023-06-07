import React, { useState } from 'react';
import palm1 from "../images/palm1.png"
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { API } from '../config/api';
import { useMutation } from 'react-query';

function Register() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


const [message, setMessage] = useState(null);
// const [show, setShow] = useState(false);
const [form, setForm] = useState({
  email: '',
  password: '',
  fullname: '',
  phone: '',
  address: '',
});

  const {fullname, email, password, phone, address} = form;
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    const response = await API.post('/register', form);

    console.log("register success : ", response)

    const alert = (
      <Alert variant="success" className="py-1">
        Register success!
      </Alert>
    );
    setMessage(alert);
    setForm({
      email: '',
      password: '',
      fullname: '',
      phone: '',
      address: '',
      
    });
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        Failed to register!
      </Alert>
    );
    setMessage(alert);
    console.log("register failed : ", error);
  }
});


  // const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{width:"75px",height:"35px"}} variant="light" onClick={handleShow}>
                Register
              </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header  className="border-0" style={{ marginBottom: "-10px" }} closeButton>
        <img style={{position:"absolute", marginTop:"50px"}} src={palm1}></img>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body  className="mx-5">
        {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={handleChange}
                className=" text-black"
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
                // className="bg-dark text-white"
                />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>FullName</Form.Label>
              <Form.Control
                type="fullname"
                placeholder="fullname"
                value={fullname}
                name="fullname"
                onChange={handleChange}
                // className="bg-dark text-white"
                />
            </Form.Group>


            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="phone"
                value={phone}
                name="phone"
                onChange={handleChange}
                // className="bg-dark text-white"
                />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>addresS</Form.Label>
              <Form.Control
                type="address"
                placeholder="address"
                value={address}
                name="address"
                onChange={handleChange}
                // className="bg-dark text-white"
                />
            </Form.Group>

        <Modal.Footer>
          <Button  type="submit" className="loginn mx-0" style={{height:'45px'}} variant="warning" >
            Register
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className="flex justify-content-center border-0"
          style={{ marginTop: "-25px" }}>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Already have an account ? Klik{" "}
            <a
              onClick={handleClose}
              style={{
                textDecoration: "none",
                color: "gray",
                cursor: "pointer",
              }}
              className="fw-semibold">
              Here
            </a>
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Register
// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// function Login(props) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const HideLogin = () => {
//     return(
      
//       <Button variant="danger" onClick={handleShow}>
//           Register
//         </Button>
    
//     )
//     }
//     const handleSubmit = () => {
//       props.login(true);
    
      
//         }

//   return (
//     <>
//      {props.hide ? <></> : <HideLogin></HideLogin>}
//       <Button variant="danger" onClick={handleShow}>
//         Register
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Register</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="">
//           <Form className="">
//             <Form.Group controlId="formBasicEmail" className="mb-3">
//               <Form.Control type="email" placeholder="Enter email" />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword" className="mb-3">
//               <Form.Control type="password" placeholder="Password" />
//             </Form.Group>

//             <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
//               <Form.Control type="password" placeholder="FullName" />
//             </Form.Group>

//             <Form.Group controlId="formBasicEmail" className="mb-3">
//               <Form.Control type="email" placeholder="Gender" />
//             </Form.Group>

//             <Form.Group controlId="formBasicEmail" className="mb-3">
//               <Form.Control type="email" placeholder="Phone" />
//             </Form.Group>

//             <Form.Group controlId="formBasicEmail" className="mb-3">
//               <Form.Control type="email" placeholder="Addres" />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="loginn" variant="secondary" onClick={handleSubmit}>
//             Register
//           </Button>

//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Login;