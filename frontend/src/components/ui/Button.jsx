import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable Button component.
 *
 * Props:
 * - type: button | submit | reset
 * - onClick: handler
 * - disabled: boolean
 * - children: content
 * - className: extra class names to preserve existing styles
 * - variant: optional variant to append known classes (e.g., 'update', 'delete', 'cancel')
 * - fullWidth: boolean to stretch button
 * - style: inline style
 * - ariaLabel: accessibility label
 * - iconLeft, iconRight: optional nodes for icons
 */
const Button = ({
  type = "button",
  onClick,
  disabled,
  children,
  className = "",
  variant,
  fullWidth = false,
  style,
  ariaLabel,
  iconLeft,
  iconRight,
}) => {
  const base = "btn";
  const variantClass = variant ? ` ${variant}` : "";
  const widthClass = fullWidth ? " full-width" : "";
  const cls = `${base}${variantClass}${widthClass}${className ? ` ${className}` : ""}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={style}
      aria-label={ariaLabel}
    >
      {iconLeft && <span className="btn-icon-left">{iconLeft}</span>}
      {children}
      {iconRight && <span className="btn-icon-right">{iconRight}</span>}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
  ariaLabel: PropTypes.string,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
};

export default Button;
