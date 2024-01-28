import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthenticationForm from "../../features/authentication";

const SignInPage = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <AuthenticationForm />
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
