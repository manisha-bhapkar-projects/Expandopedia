import React, { useEffect } from "react";
import expandologo from "../../images/expandologo.png";
import check_circle from "../../images/check-circle-fill.png";
const ConfirmAccount = (props) => {
  useEffect(() => {
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.location.origin == "http://localhost:3000") {
      window.location.href = `http://localhost:3001`;
    } else{
      window.location.href = "https://expuitest.azurewebsites.net/login/";
    }
  };



  return (
    <div>
      <div className="login-wrapper">
        <div className="login-box confirm-act-wrap">

          <h3>Your password was successfully set!
         <img src={check_circle}/>
             </h3>
          <div className="form">
            <div className="floating">
              <button
                type="button"
                className="btn btn-primary btn-login-active"
                onClick={handleSubmit}
              >
                Continue to Login
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



export default ConfirmAccount;

