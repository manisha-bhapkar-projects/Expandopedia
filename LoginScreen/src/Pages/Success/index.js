import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import Arrow from "../../assets/images/curve-arrow.png";
import { getUserProfile } from "../../utils/storage";

const Success = (props) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let user_data = getUserProfile();
    setImageUrl(user_data.imageUrl);
    console.log("succ", user_data);
  }, []);

  const gotoHomePage = () => {
    sessionStorage.removeItem("showTutorial");
    if (props.onClose) props.onClose();
  };

  return (
    <div className="black-overlay">
      <div className="msg-wrapper">
        <h3>You’re good to go.</h3>
        <p>
          Change your information anytime by clicking on your profile picture on
          the top right corner.
        </p>
        <span onClick={gotoHomePage} className="btn btn-primary">
          Go to my Home Page
        </span>
      </div>
      <div className="profile-wrap">
        <div className="floating">
          {imageUrl ? (
            <img
              src={
                imageUrl
                  ? `${constants.API.COUNTRY.GET_FLAG_DOWNLOAD}${imageUrl} `
                  : ""
              }
              className="profile-picture"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="information-wrap">
        <img src={Arrow} />
        <h3>Click here to change your information anytime</h3>
      </div>
    </div>
  );
};

export default Success;
