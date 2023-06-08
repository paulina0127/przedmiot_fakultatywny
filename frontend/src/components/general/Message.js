import { useState } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, style }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={variant}
        onClose={() => setShow(false)}
        style={style}
        dismissible
      >
        {children}
      </Alert>
    );
  }
};

export default Message;
