import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../main";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        setEmail("");
        setPassword("");
        toast.success(res.data.message);
        navigate("/");
        setIsAuth(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      return toast.error("Error");
    }
  };
  return (
    <main>
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <h4>Don't have an account?</h4>
          <Link className="form-link" to={"/register"}>
            Sign up
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Login;
