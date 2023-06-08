import { Spinner } from "react-bootstrap";

const Loader = ({ style }) => {
  return (
    <Spinner animation="border" role="status" className="loader" style={style}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
