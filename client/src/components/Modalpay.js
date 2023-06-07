import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Modalpay = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <div style={{ width: "500px", backgroundColor: "white" }}>
        <p
          style={{
            color: "black",
            fontSize: "20px",
            textAlign: "center",
            width: "500px",
            marginRight: "700px",
            height: "73px",
          }}
        >
          Your payment will be confirmed within 1 x 24 hours To see orders
          <Link style={{marginLeft:"5px",marginRight:"5px",textDecoration:"none"}} to="/Profile">click Here</Link>
          Here thank you
        </p>
      </div>
    </Modal>
  );
};
export default Modalpay;
