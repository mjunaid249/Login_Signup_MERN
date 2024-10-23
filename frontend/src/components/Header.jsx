import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
const Header = () => {
  const { isAuth, setIsAuth } = useContext(Context);

  async function logout() {
    try {
      const res = await axios.get("http://localhost:3000/api/user/logout");

      if (res.data.success) {
        toast.success(res.data.message);
        setIsAuth(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header>
      <Link to={"/"} className="logo">
        Auth
      </Link>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={"/profile"}>
              Profile
            </Link>
          </li>
          <li>
            {isAuth ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <Link className="nav-link" to={"/login"}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
