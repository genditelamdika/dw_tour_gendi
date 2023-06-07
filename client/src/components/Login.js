// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';

import { API, setAuthToken } from '../config/api';
import { UserContext } from '../context/userContext';

import palm1 from "../images/palm1.png"
// import { Navigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();

  // const [username, setUsername] = useState(''); //2 argumen string kodong dikarenakan nilai nya belum ada
  // const [password, setPassword] = useState(''); // di saat di inputkan maka nilainya akan di perbarui mengunakan si set
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  
  const [_, dispatch] = useContext(UserContext);
  
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post('/login', form);

      console.log("login success : ", response);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      // Status check
      if (response.data.data.role === 'admin') {
        navigate('/Trip');
      } else {
        navigate('/');
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }
  });
  

  return (
    <div>
      <Button className="" style={{width:"70px",height:"35px"}} variant="warning" onClick={() => setShowModal(true)}>
        Login
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}> 

        <Modal.Header  closeButton>
          <img style={{position:"absolute", marginTop:"50px"}} src={palm1}></img>
          <Modal.Title style={{color:"black", marginLeft:"200px"}}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-3" >
        {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={handleChange} //jadi nilai setusername disini akan menetapkan nilainya ke username
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
      <Button style={{height:'45px',marginTop:"30px"}}  type="submit" className="loginn mx-1 text-light" variant="warning" >
        Login
      </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
      </Modal.Footer>
      <Modal.Footer
          className="flex justify-content-center border-0"
          style={{ marginTop: "-25px" }}>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Already have an account ? Klik{" "}
            <a
              onClick={show}
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
    </div>
  );
};

export default Login;
