import { Link } from "react-router-dom";
import "./style.css";
import argentBankLogo from "../../assets/images/argentBankLogo.png";

const Header = ({ children }) => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
        {children}
      </div>
    </nav>
  );
};

export default Header;
