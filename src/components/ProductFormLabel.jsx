import React from "react";
import { capitalize, chain } from "lodash";
import PropTypes from "prop-types";
function ProductFormLabel({ name, textLabel, customClassName, children }) {
  const text = textLabel || capitalize(name);
  return (
    <label
      htmlFor={name}
      className={
        customClassName || "block text-sm font-medium text-gray-700 mb-1"
      }
    >
      {children || text}
    </label>
  );
}

ProductFormLabel.protoTypes = {
  name: PropTypes.string.isRequired,
  textLabel: PropTypes.string.isRequired,
  customClassName: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default ProductFormLabel;
