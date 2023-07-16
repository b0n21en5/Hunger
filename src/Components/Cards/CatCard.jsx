import "./cards.css";

const Card = ({ imgSrc, title, text }) => {
  return (
    <div className="card" style={{ width: "353px" }}>
      <img
        height="170"
        width="353"
        src={imgSrc}
        className="card-img-top"
        alt="card"
      />
      <div className="card-body">
        <p id="card-title">{title}</p>
        <p id="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
