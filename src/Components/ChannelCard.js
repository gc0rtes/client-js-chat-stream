// import { Link } from "react-router-dom";
import "./cards.css";

export default function ChannelCard(props) {
  return (
    <div className="container-card">
      <div className="card">
        <h5>Name: {props.name} </h5>
        <h6>id: {props.id}</h6>
        <h6>type: {props.type}</h6>
        <h6>Created by: {props.createdBy}</h6>
        {/* <Link to={`/details/${props.planetId}`}>Details</Link> */}
      </div>
    </div>
  );
}
