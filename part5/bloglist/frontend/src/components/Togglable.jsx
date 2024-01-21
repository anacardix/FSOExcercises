import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
