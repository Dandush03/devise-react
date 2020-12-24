import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import focusText from '../javascripts/focusText';

const Input = ({
  type, name, fowardRef, label, id, loaded, icon,
}) => {
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const newRef = useCallback((node) => {
    if (node !== null) {
      setInput(node.value);
      fowardRef(node);
    }
  }, [fowardRef]);

  useEffect(() => {
    const currentInput = document.getElementsByName(name);
    if (currentInput[0].value) setInput(currentInput[0].value);
  }, [loaded, name]);

  if (label) {
    return (
      <label htmlFor={name} className={`info${input ? ' on' : ''}`} onClick={focusText} role="presentation">
        {icon ? <img src={icon} alt="icon" className="icon" /> : null}
        <span>{label}</span>
        <input
          type={type}
          name={name}
          id={id}
          onChange={inputHandler}
          ref={newRef}
        />
      </label>
    );
  }

  return (
    <input
      type={type}
      name={name}
      id={id}
      onChange={inputHandler}
      ref={newRef}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  loaded: PropTypes.bool,
  id: PropTypes.string,
  fowardRef: PropTypes.func,
};

Input.defaultProps = {
  label: null,
  id: null,
  fowardRef: null,
  icon: null,
  loaded: false,
};

export default Input;
