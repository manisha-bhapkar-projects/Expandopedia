import React from "react";
import PropTypes from "prop-types";
import "./TextFieldComponent.css";

const TextFieldComponent = ({
  id,
  label,
  className,
  labelClassName,
  inputClassName,
  error,
  helperText,
  helperTextClassName,
  isDisable,
  dataContent,
  title,
  onClick,
  icon,
  ...rest
}) => {
  return (
    <div className={` ${className}`} >
   
      <input
        style={{cursor: isDisable ? "not-allowed": "text"}}
        id={id}
        className={
          !error
            ? `floating__input   ${inputClassName}`
            : `floating__input error ${inputClassName}`
        }
        disabled={isDisable}
        autoComplete="off"
        {...rest}
        data-test="input-field"
      />
         {label ? (
        <label
          htmlFor={id} 
          className={
            !error
              ? `floating__label ${labelClassName}`
              : `floating__label error ${labelClassName}`
          }
          data-content={dataContent}
          data-test='input-label'
        >
          {/* {label} */}
         <span className="hidden--visually">{label}</span>
        </label>
      ) : (
        ""
      )}
       {/* <i className="ph-eye" /> */}
      { error ? (
        <small
          className={`${helperTextClassName} errormsg`}
          data-test='small'
        >
          {helperText}
        </small>
      ) : ( 
        ""
      )}
        {icon == true ? <div onClick={onClick} data-test='iconDiv' >
              <i className="fa fa-eye " />
            </div>: "" }
            {error ?
             <div className="errormsg">
             {helperText}
           </div>: "" }
           
    </div>
  );
};

TextFieldComponent.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  helperTextClassName: PropTypes.string,
  isDisable: PropTypes.bool,
};

TextFieldComponent.defaultProps = {
  className: "",
  label: "",
  labelClassName: "",
  inputClassName: "",
  error: false,
  helperText: "",
  helperTextClassName: "",
  isDisable: false,
};

export default TextFieldComponent;
