import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, Setinput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, SetErr] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    Setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:3001/server/auth/register", inputs);
      nav("/login");
    } catch (err) {
      SetErr(err.response.data);
    }
    
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social Media</h1>
          <p>Hello Welcome!,</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
