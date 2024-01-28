import { Link } from "react-router-dom";
import AccountItem from "../../components/AccountItem";
import accountItems from "../../data/accountItems.json";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileHeader from "../../features/profile";

const ProfilePage = () => {
  return (
    <>
      <Header>
        <Link className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </Header>
      <main className="main bg-dark">
        <ProfileHeader />
        <h2 className="sr-only">Accounts</h2>
        {accountItems.map((item) => (
          <AccountItem
            key={item.id}
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
