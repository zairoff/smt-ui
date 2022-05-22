import React from "react";
import { Link } from "react-router-dom";

const MachineCard = ({ id, title, imageUrl }) => {
  return (
    <div
      className="card m-2 shadow"
      style={{ height: "250px", width: "200px" }}
    >
      <img className="card-img-top" src={imageUrl} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link to={"/machine-history/" + id} className="link">
          More
        </Link>
      </div>
    </div>
  );
};

export default MachineCard;
