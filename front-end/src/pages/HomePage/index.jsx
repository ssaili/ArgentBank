import "./style.css";
import featuresItems from "../../data/featureItems.json";
import FeatureItem from "../../components/FeatureItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Banner from "../../components/Banner";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {featuresItems.map((item) => (
            <FeatureItem
              key={item.id}
              imageSrc={require(`../../assets/icons/${item.imageSrc}`)}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
