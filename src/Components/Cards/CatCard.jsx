import "./cards.css";

const Card = ({ imgSrc, title, text }) => {
  return (
    <div className="card" style={{ width: "20rem" }}>
      <img
        height="140px"
        width="370px"
        src={imgSrc}
        className="card-img-top"
        alt="card"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
