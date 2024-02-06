import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const Togglable = forwardRef((props, refs) => {
  const [childrenVisibility, setChildrenVisibility] = useState(false);

  const toggleVisibility = () => {
    setChildrenVisibility(!childrenVisibility);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  const hideWhenVisible = { display: childrenVisibility ? "none" : "" };
  const showWhenVisible = { display: childrenVisibility ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility} className="mt-4">Cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
