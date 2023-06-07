import { Component } from "react";
import leaf1 from "../images/leaf1.png";
// import '../css/header.css'

class Footer extends Component {
  render() {
    return (
      <>
        <footer 
        style={{
          background: '#FFAF00',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px'
        }}>
          <p style={{
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "600",
            margin: "0"
          }}>
            Copyright @ 2023 Dewe Tour - Gendi Telamdika - NIS. All Rights reserved
            
          </p>
          <div style={{marginLeft:"1230px", marginBottom:"100px",position:"absolute"}}>
            <img src={leaf1}></img>
          </div>
        </footer>
      </>
    )
  }
}

export default Footer;