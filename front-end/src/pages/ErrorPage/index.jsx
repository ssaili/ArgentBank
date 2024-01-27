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
          Erreur 404
          <br />
          <Link className="error-homepage-link" to="/">
            Retourner sur la page d'accueil
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
