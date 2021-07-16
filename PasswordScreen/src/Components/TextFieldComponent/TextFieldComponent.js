import React from "react";
import PropTypes from "prop-types";
import "./TextFieldComponent.css";
import eye_icon from "../../images/eye-icon.png"
import eye_icon_open from "../../images/eye-icon-open.png"

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
  showConfirmPassword,
  ...rest
}) => {
  return (
    <div className={` ${className}`}>
   
      <input
        id={id}
        className={
          !error
            ? `floating__input   ${inputClassName}`
            : `floating__input error ${inputClassName}`
        }
        disabled={isDisable}
        autoComplete="off"
        {...rest}
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
        >
          {/* {label} */}
         <span className="hidden--visually">{label}</span>
        </label>
      ) : (
        ""
      )}
       {/* <i className="ph-eye" /> */}
      {/* { error ? (
        <small
          className={
            !error
              ? `${helperTextClassName} helper-text`
              : `${helperTextClassName} errormsg`
          }
        >
          {helperText}
        </small>
      ) : (
        ""
      )} */}
        {icon == true ? 
        <div onClick={onClick} className="eye-pw">
              {/* <i className="fa fa-eye-slash" /> */}
             {console.log("showConfirmPassword",showConfirmPassword)} 
              {showConfirmPassword ?  <img src={eye_icon_open}/> :
 <img src={eye_icon}/> }
            
          

            </div>
            : "" }
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
