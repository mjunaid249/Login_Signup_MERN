import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.css";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setName("");
        setEmail("");
        setPassword("");
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
          <h4>Already have an account?</h4>
          <Link className="form-link" to={"/login"}>
            Login
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Signup;
