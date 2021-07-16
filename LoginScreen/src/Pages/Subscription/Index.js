import React, { useState, useEffect, useReducer, Fragment } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../Components/SearchBar";
import SupportButton from "../../Components/SupportButton";

import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getSubscriptionList } from "../../Store/reducers/subscription";
const Subscriptions = () => {
    const userProfile = useSelector((state) => state.user.userProfile);
    const history = useHistory();
    const [subData, setSubData] = useState();
    useEffect(()=>{
        getSubscriptionlist_details();
    },[])

    const getSubscriptionlist_details = async () => {
        const response = await getSubscriptionList({});
        if (response && response.data) {
            setSubData(response.data);
        }
    }
    let listTemp = "";
    if(subData!=null){
        listTemp =  subData.map((e)=>{
            let prom_temp = "";
            if(e.isPromotionApplied){
                prom_temp =  <div className='promo'> Promo </div>;
            }
            return (
                <div className="subscription-pack">
                        <h5>{e.name}</h5>
                        <div className="subscription-price">
                        {prom_temp} ${e.promotionPrice} <span>per year</span>
                        </div>
                        <div className="subscription-price" style={{fontSize:'14px',color:'#708090'}}>
                         ${e.price} <span>per year</span>
                        </div>
                        <button className="btn-primary-outline text-uppercase" onClick={()=>history.push(`/view-subscription/${e.id}`)}>
                            View Subscription
                        </button>
                    </div>
            )
        })
    }

    

    return (
        <div className="container-fluid">
            <SearchBar user={userProfile} />
           
      <div className="breadcrump-admin">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pl-0">
            <li className="breadcrumb-item"><span>Settings</span></li>
            <li className="breadcrumb-item " aria-current="page">Subscriptions</li>
            
          </ol>
        </nav>
      </div>
    
            <div className="subscription-container">
                <div className="subscription-header">
                    <h3>Subscriptions</h3>
                    <span className="primary-button pointer" onClick={() => history.push('/create-subscription')}>Create Subscription</span>
                </div>

                <div className="subscription-grid">
                    {subData? listTemp : "Loading Data..."}
                </div>
            </div>
           <SupportButton/>
        </div>
    );
};

export default Subscriptions;
