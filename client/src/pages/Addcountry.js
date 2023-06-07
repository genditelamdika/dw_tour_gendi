import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";

function Addcountry(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState(null);
// const [show, setShow] = useState(false);
const [form, setForm] = useState({
  name: '',
});

  const {name} = form;
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    const response = await API.post('/country', form);

    console.log("country success : ", response)

    const alert = (
      <Alert variant="success" className="py-1">
        country success!
      </Alert>
    );
    setMessage(alert);
    setForm({
      name: '',
      
    });
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        Failed to country!
      </Alert>
    );
    setMessage(alert);
    console.log("country failed : ", error);
  }
});




    return(
        <>
             <Button style={{width:"200px",height:"50px"}} variant="warning" onClick={handleShow}>
                Add Country
              </Button>
        <Modal show={show} onHide={handleClose} >
            <Modal.Body>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                name="name"
                onChange={handleChange}
                className=" text-black"
                />
            </Form.Group>
            <Button type="submit">Save</Button>
                </Form>
            </Modal.Body>

        </Modal>
        </>
    )
}

export default Addcountry