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

  const { loading } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayEditName, setDisplayEditName] = useState(false);

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

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;

    dispatch(editUser({ firstName: firstName, lastName: lastName }))
      .unwrap()
      .then((promiseResult) => {
        if (promiseResult.status === 200) {
          setFirstName(firstName);
          setLastName(lastName);
          setDisplayEditName(false);
        } else {
          console.error(promiseResult.message);
          setDisplayEditName(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setDisplayEditName(false);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header firstName={firstName}>
        <Link className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </Header>
      <main className="main bg-dark">
        <div className="header">
          {!displayEditName ? (
            <>
              <h1>
                Welcome back
                <br />
                {firstName} {lastName}!
              </h1>
              <button
                className="edit-button"
                onClick={() => setDisplayEditName(true)}
              >
                Edit Name
              </button>
            </>
          ) : (
            <>
              <h1>Welcome back</h1>
              <form onSubmit={handleSubmit} className="edit-name-form">
                <div className="inputs-wrapper">
                  <div className="firstname-wrapper">
                    <label hidden htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue={firstName}
                    />
                  </div>
                  <div className="lastname-wrapper">
                    <label hidden htmlFor="lastName">
                      Last Name
                    </label>
                    <input type="text" id="lastName" defaultValue={lastName} />
                  </div>
                </div>
                <div className="buttons-wrapper">
                  <button type="submit">
                    {loading ? "Loading..." : "Save"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplayEditName(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accountItems.map((item) => (
          <AccountItem
            key={nanoid()}
            title={item.title}
            amount={item.amount}
            amountDescription={item.amountDescription}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
