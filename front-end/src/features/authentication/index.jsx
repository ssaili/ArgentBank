import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "./authenticationSlice";
import "./style.css";

const AuthenticationForm = () => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.authentication);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setMessage("Please fill out all fields");
      return;
    }

    dispatch(login({ email: email, password: password }))
      .unwrap()
      .then((promiseResult) => {
        if (promiseResult.status === 200) {
          localStorage.setItem("token", promiseResult.body.token);
          navigate("/profile");
        } else {
          setMessage(promiseResult.message);
        }
      })
      .catch((error) => {
        console.error(error.message);
        navigate("/error");
      });
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        {message && <p className="sign-in-error-message">{message}</p>}
        <button type="submit" className="sign-in-button">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </section>
  );
};

export default AuthenticationForm;
