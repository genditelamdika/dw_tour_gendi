import Login from "../components/Login";
import Register from "../components/Register";
import { UserContext } from "../context/userContext";
import * as jose from "jose";
import Home from "../components/Home";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Dropdown, NavDropdown } from "react-bootstrap";
import Dropdownn from "../images/Ellipse1.png";
import bill from "../images/bill1.png";
import userr from "../images/userr.png";
import journey from "../images/journey.png";
import logout from "../images/logout.png";
function Header() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  //validasi Login
  const [validlogin, setValidlogin] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [claims, setClaims] = useState({});
  const [handleDropdown, setHandleDropdown] = useState(false);

  let navigate = useNavigate();

  let user = localStorage.getItem("token");
  console.log("sate", state);
  //Active Pages
  let activeStyle = {
    textDecoration: "none",
    fontWeight: "10px",
    color: "white",
  };

  let nonActive = {
    textDecoration: "none",
    color: "grey",
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  //   handle login form
  const openLogin = () => {
    setLogin(true);
  };
  const closeLogin = () => {
    setLogin(false);
  };

  //   handle register form
  const openRegister = () => {
    setRegister(true);
  };
  const closeRegister = () => {
    setRegister(false);
  };

  useEffect(() => {
    if (user) {
      setValidlogin(true);
      setClaims(jose.decodeJwt(user));
    } else {
      setValidlogin(false);
    }
  }, [user]);
  return (
    <nav>
      <img
        style={{ width: "100%" }}
        src={require("../images/navba1.png")}
        alt="gambar"
      ></img>

      <div className="left-side" style={{ position: "absolute" }}>
        <ul>
          <li>
            <Link to={"/"} className="text-white">
              <img src={require("../images/Icon.png")} alt="gambar"></img>
            </Link>
          </li>
        </ul>
      </div>
      <div className="right-side">
        {validlogin ? (
          <Dropdown className="white">
            <Dropdown.Toggle className="btnsa">
              <img
                // style={{border:"none"}}
                type="button"
                onClick={() => setHandleDropdown(!handleDropdown)}
                src={Dropdownn}
                alt="gambaru"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="Mdrop  mt-0 ms-1">
              {state.user.role === "admin" ? (
                <>
                  {" "}
                  <Dropdown.Item className="bg-white" style={{}}>
                    <img src={journey} />
                    <Link to="/Trip">Trip </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="bg-white">
                    <img src={bill} />
                    <Link to="/Transaction">Transaction </Link>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item>
                    <img src={userr} />
                    <Link to="/Profile">Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <img src={bill} />
                    <Link to="/Pay">Pay</Link>
                  </Dropdown.Item>
                </>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item
                className="bg-white text-dark"
                style={{ padding: "10px" }}
                onClick={logout}
              >
                <img src={logout} />
                Logout
              </NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <div
              className="r"
              style={{ position: "absolute", marginRight: "120px" }}
            >
              <Register
                register={register}
                closeRegister={closeRegister}
                openLogin={openLogin}
              />
            </div>
            <div className="b" style={{ position: "absolute" }}>
              <Login
                login={login}
                closeLogin={closeLogin}
                openRegister={openRegister}
                setValidlogin={setValidlogin}
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
export default Header;
