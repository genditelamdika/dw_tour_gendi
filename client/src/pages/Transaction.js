import React, { useEffect } from "react";
import "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useState } from "react";
import action from "../images/action.png";
import Modaltransaction from "../components/Modaltransaction";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import transaction from "../data/transaction.json";
function Transaction() {
  const [transid,setTransid] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("pending");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTransactionEmail, setSelectedTransactionEmail] = useState("");

  const handleApprove = () => {


      setStatus("aktif");

    // setModalOpen(false); // Tutup modal setelah menyetujui
  };
  
  const handleModalShow = async(transacid) => {
    const response = await API.get(`/transaction/${transacid}`);
    
    setTransid(response.data.data)
    // setSelectedTransaction(response.data.data.id)
    setShowModal(true);
    selectedTransaction(52)
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });
  
  return (
    <>
      <div style={{ background: "#E5E5E5", height: "100vh" }}>
        <div className="container">
          <h3 className="text-dark py-4">Incoming Transaction</h3>
          <Table striped hover>
            <thead>
              <tr style={{ background: "white", color: "red" }}>
                <th>No</th>
                <th>Users</th>
                <th>Trip</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((item) => {
                return (
                  <tr style={{ background: "white" }}>
                    <td style={{ height: "70px" }} className="text-dark">
                      {item.id}
                    </td>
                    <td className="text-dark">{item.user.email}</td>
                    <td className="text-dark">{item.trip.title}</td>
                    <td className="text-dark">Bca.jpg</td>
                    {/* <td style={{ color: "green" }}>Approve</td> */}
                    <td style={{ color: "green" }}>{status}</td>
                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => handleModalShow(item.id)}
                      >
                        <img src={action}></img>
                      </button>
                    
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
              <Modaltransaction
              data={transid}
                // onApprove={handleApprove}
                onApprove={() => handleApprove(selectedTransaction)}
                show={showModal}
                onHide={handleModalHide}
                selectedTransactionEmail={selectedTransactionEmail}
                // selectedTransaction={selectedTransaction}
              />
        </div>
      </div>
    </>
  );
}
export default Transaction;
