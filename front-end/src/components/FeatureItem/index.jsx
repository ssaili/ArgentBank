import "./style.css";

const FeatureItem = ({ imageSrc, imageAlt, title, description }) => {
  return (
    <div className="feature-item">
      <img src={imageSrc} alt={`${imageAlt} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
