import { Link } from "react-router-dom";
import "./style.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="error">
        <p className="error-number">
          An error has occurred. Please try again later.
          <br />
          <Link className="error-homepage-link" to="/">
            Go to Homepage
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
