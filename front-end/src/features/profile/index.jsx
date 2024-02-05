import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUser, editUser } from "./profileSlice";
import "./style.css";
import AccountItem from "../../components/AccountItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import accountItems from "../../data/accountItems.json";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { getLoading, editLoading } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isActive, setisActive] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((promiseResult) => {
        if (promiseResult.status === 200) {
          setFirstName(promiseResult.body.firstName);
          setLastName(promiseResult.body.lastName);
        } else {
          console.error(promiseResult.message);
          navigate("/error");
        }
      })
      .catch((error) => {
        console.error(error.message);
        navigate("/error");
      });

    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(null);

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;

    if (!firstName || !lastName) {
      setMessage("Please fill out all fields");
      return;
    }

    dispatch(editUser({ firstName: firstName, lastName: lastName }))
      .unwrap()
      .then((promiseResult) => {
        if (promiseResult.status === 200) {
          setFirstName(firstName.charAt(0).toUpperCase() + firstName.slice(1));
          setLastName(lastName.charAt(0).toUpperCase() + lastName.slice(1));
          setisActive(false);
        } else {
          setMessage(promiseResult.message);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setisActive(false);
      });
  };

  return getLoading ? (
    <Loader />
  ) : (
    <>
      <Header firstName={firstName}>
        <Link className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </Header>
      <main className={!isActive ? "main bg-dark" : "main bg-light"}>
        {!isActive ? (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button className="edit-button" onClick={() => setisActive(true)}>
              Edit Name
            </button>
          </div>
        ) : (
          <div className="header-light">
            <h1>Welcome back</h1>
            <form onSubmit={handleSubmit} className="edit-name-form">
              <div className="inputs-wrapper">
                <div className="firstname-wrapper">
                  <label hidden htmlFor="firstName">
                    First Name
                  </label>
                  <input type="text" id="firstName" placeholder={firstName} />
                </div>
                <div className="lastname-wrapper">
                  <label hidden htmlFor="lastName">
                    Last Name
                  </label>
                  <input type="text" id="lastName" placeholder={lastName} />
                </div>
              </div>
              <div className="buttons-wrapper">
                <button type="submit">
                  {editLoading ? "Loading..." : "Save"}
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMessage(null);
                    setisActive(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
            {message && <p className="edit-name-error-message">{message}</p>}
          </div>
        )}

        <h2 className="sr-only">Accounts</h2>
        {accountItems.map((item) => (
          <AccountItem
            key={nanoid()}
            title={item.title}
            amount={item.amount}
            amountDescription={item.amountDescription}
            className={
              !isActive ? "transaction-button" : "transaction-button-light"
            }
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
