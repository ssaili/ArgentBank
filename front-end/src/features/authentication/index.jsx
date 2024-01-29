import "./style.css";
import { login } from "./authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthenticationForm = () => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.authentication);

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === "" || password === "") {
      setMessage("Please fill in all fields");
      return;
    }

    dispatch(login({ email: username, password: password })).then(
      (response) => {
        if (response.meta.requestStatus === "rejected") {
          console.error(response.error.message);
          navigate("*");
        } else if (response.meta.requestStatus === "fulfilled") {
          switch (response.payload.status) {
            case 400:
              response.payload.message === "Error: User not found!"
                ? setMessage("Incorrect username")
                : setMessage("Incorrect password");
              break;
            case 200:
              navigate("/profile");
              break;
            default:
              console.error(response.payload.message);
              navigate("*");
              break;
          }
        }
      }
    );
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
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
