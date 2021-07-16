import React, { useEffect, useState } from "react";
import {
  callCreatePasswordAPI,
  callSetUserProfileAPI,
} from "../../Actions/CreatePasswordAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { storeUserData, getUserData } from "../../utils/storage/index";
import { validdatePassword } from "../../utils/validation";
import expandologo from "../../images/expandologo.png";
import constants from "../../utils/constants";
import { useHistory, useLocation } from "react-router-dom";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
const CreatePassword = (props) => {
  const location = useLocation();
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const history = useHistory();
  const id = props.match.params.id;
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getUserDetails(id);
  }, []);
  var local_data = getUserData();
  var UserId = local_data ? (local_data.id ? local_data.id : "") : "";

  const request = {
    UserId,
    password: initialValues.password,
  };

  const getUserDetails = (activationCode) => {
    props
      .callCreatePasswordAPIAction(activationCode)
      .then((response) => {
        console.log("user details", response.data.data.data[0]);
        storeUserData(response.data.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);
    if (Object.keys(validation).length === 0)
      props
        .callSetUserProfileAPIAction(request)
        .then((res) => {
          console.log("profile submitted", res);
          history.push(constants.ROUTE.PASSWORD.CONFIRM_ACCOUNT);
          CustomeNotification(
            "success",
            "Password Set Successfully",
            "Success",
            2000
          );
        })
        .catch((error) => {
          CustomeNotification(
            "error",
            error.response.data.errors,
            "Error",
            2500,
            () => {}
          );
        });
  };

  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
    setIsError({ ...isError, [e.target.name]: "" });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password should contain Minimum eight characters";
    } else if (!validdatePassword(values.password)) {
      errors.password =
        "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character:";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is Required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password doesn't match";
    }
    return errors;
  };

  const handleFocus = (e) => {
    const validation = validate(initialValues);
    setIsError(validation);
    setIsFocus({ ...isFocus, [e.target.name]: true });
  };

  return (
    <div>
      <div className="login-wrapper">
        <div className="login-box">
          <h3>Email verified! Let’s set your password.</h3>
          <div className="form">
            <div className="floating">
              <TextFieldComponent
                id="password"
                label="Password"
                dataContent="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={initialValues.password}
                onBlur={handleFocus}
                onChange={handleChangeValue}
                icon={true}
                onClick={() => setShowPassword(!showPassword)}
                showConfirmPassword={showPassword}
              />
              <div className="text-right small text-white">At least 8 characters long</div>
              <div className="errormsg">
                {isError.password ? isError.password : null}
              </div>
            </div>

            <div className="floating create-floating-label">
              <TextFieldComponent
                id="confirmPassword"
                label="ConfirmPassword"
                dataContent="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="ConfirmPassword"
                name="confirmPassword"
                value={initialValues.confirmPassword}
                onBlur={handleFocus}
                onChange={handleChangeValue}
                icon={true}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                showConfirmPassword={showConfirmPassword}
              />
              <div className="errormsg">
                {isError.confirmPassword ? isError.confirmPassword : null}
              </div>
            </div>

            <div className="floating">
              <button
                type="button"
                className={`btn btn-primary  ${
                  initialValues &&
                  initialValues.password &&
                  initialValues.confirmPassword
                    ? "btn-login-active"
                    : "btn-login-disable btn-dark"
                }`}
                disabled={
                  initialValues &&
                  initialValues.password &&
                  initialValues.confirmPassword
                    ? false
                    : true
                }
                onClick={handleSubmit}
              >
                Set Password
              </button>
            </div>
          </div>
        </div>
        <div className="expando_logo">
          <img src={expandologo} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callCreatePasswordAPIAction: callCreatePasswordAPI,
      callSetUserProfileAPIAction: callSetUserProfileAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(CreatePassword);
