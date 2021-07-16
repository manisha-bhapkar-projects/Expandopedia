import React from 'react';
import profile_img from "../../assets/images/dp.jpeg";
import constants from "../../utils/constants";

const Expertimage = (props) => {
    const getExpertImage = (expertData) => {
       console.log("expertData",expertData);
          let imageContent = expertData?.[0]?.topics?.length ?
            expertData[0].topics.find(item => item.topicName === "Expert Pic-"+expertData[0].supertopicName)
            : null
    
          return imageContent?.topicContent
        
      }
    console.log("props",props);
    let profile_name = "";
    let profile_img_link = "";
    if(props.card_data != ""){
        profile_name = props.card_data?.length ? props.card_data[0].supertopicName : "";
        profile_img_link = getExpertImage(props.card_data) ? `${constants.IMAGE.DOWNLOAD}${getExpertImage(props.card_data)}` : profile_img;
        // console.log(props.card_data[0].supertopicName)
    }
   
    console.log(profile_name);
    return (
        <div className="col-lg-4 gutter-card">
            <div className="Expert-team-wrapper">
                <div className="blue-header-section">
                    <h3>Regional Expert Team Lead</h3>
                </div>
                <div className="expert-wrapper">
                    <img src={profile_img_link?profile_img_link:profile_img} />
                    <h3>{profile_name}</h3>
                    <h5>18 advisory hrs left</h5>
                    <a href className="btn btn-primary">Ask a Question</a>
                    {/* <a href className="mt-4 darkeralt">Schedule a Meeting</a>
                    <a href className="mt-3">Buy More Hours</a> */}
                </div>
            </div>
        </div>
    );
}

export default Expertimage;