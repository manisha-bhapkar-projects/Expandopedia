import React, { useState } from 'react'
import magnet from "../../assets/images/magnet.svg"
import handshake from "../../assets/images/hadnshake.svg"
import retain from "../../assets/images/retain.svg"
import offboard from "../../assets/images/offboard.svg"
import arrow_lc from "../../assets/images/arrow-lc.svg"
import download_btn from "../../assets/images/download-btn.svg"

const EmployeeLifeCycle=(props)=>{
const [seeMore,setSeeMore]=useState(false)
const handleSee=()=>{
    setSeeMore(!seeMore)
}


    return(

        <div className="tab-section">
              <div className="">
                  <h3>Employee Lifecycle</h3>
              </div>
              <div className="tab-2-container">
                <div className="row">
                  <div className="col-md-3 position-relative">
                    <div className="nxt-arrow"><img src={arrow_lc}></img></div>

                    <div className="round-136 green">
                    <img src={magnet}></img>
                    <span>attract</span>
                    </div>
                    {/*<a href="" className="download-btn">
                          <span>Download</span>
                          <img src={download_btn}></img>
                        </a> */}
                    <div className="tab-2-contents">
                      <ul>
                      {
                          !seeMore&&props.attract&&
                        props?.attract?.map((attractItem,index)=>{
                            if(index<3)
                            return(
                              <div>
                                <li onClick={() =>{props.onClickLifecycle(attractItem, props.attractId)} }>{attractItem.supertopicName}</li>
                                </div>
                            )
                        })
                     }
                     {
                        seeMore&&props.attract&&
                      props?.attract?.map((attractItem,index)=>{
                        
                          return(
                              <li onClick={() => props.onClickLifecycle(attractItem, props.attractId)}>{attractItem.supertopicName}</li>
                          )
                      })
                   }
                       
                      </ul>
                    </div>
                    
                  </div>
                  <div className="col-md-3 position-relative">
                    <div className="nxt-arrow"><img src={arrow_lc}></img></div>

                    <div className="round-136 aquagreen">
                    <img src={handshake}></img>
                    <span>Onboard</span>
                    </div>

                    <div className="tab-2-contents">
                      <ul>
                       {
                          !seeMore&&props.onBoard&&props?.onBoard.map((onBoardItems,index)=>{
                              if(index<3)
                               return(
                                   <li onClick={() => props.onClickLifecycle(onBoardItems, props.onBoardId)}>{onBoardItems.supertopicName}</li>
                                   
                               )
                           })
                       }
                       {
                        seeMore&&props.onBoard&&props?.onBoard.map((onBoardItems,index)=>{
                           
                             return(
                                 <li onClick={() => props.onClickLifecycle(onBoardItems, props.onBoardId)}>{onBoardItems.supertopicName}</li>
                             )
                         })
                     }
                      </ul>
                    </div>
                    
                  </div>
                  <div className="col-md-3 position-relative">
                    <div className="nxt-arrow"><img src={arrow_lc}></img></div>

                    <div className="round-136 blue">
                    <img src={retain}></img>
                    <span>Develop <br/>& Retain</span>
                    </div>

                    <div className="tab-2-contents">
                      <ul>
                       {
                          !seeMore&&props.develop&&props.develop.map((devItems,index)=>{
                              if(index<3)
                               return(
                                   <li onClick={() => props.onClickLifecycle(devItems, props.developId)}>{devItems.supertopicName}</li>
                               )
                           })
                       }
                       {
                        seeMore&&props.develop&&props.develop.map((devItems)=>{
                             return(
                                 <li onClick={() => props.onClickLifecycle(devItems,  props.developId)}>{devItems.supertopicName}</li>
                             )
                         })
                     }
                      </ul>
                    </div>
                    
                  </div>
                  <div className="col-md-3 position-relative">
                    

                    <div className="round-136 orange">
                    <img src={offboard}></img>
                    <span>Offboard</span>
                    </div>

                    <div className="tab-2-contents">
                      <ul>
                       {
                          !seeMore&&props.offBoard&&props.offBoard.map((offItems,index)=>{
                               if(index<3){
                                return(
                                    <li onClick={() => props.onClickLifecycle(offItems,  props.offBoardId)}>{offItems.supertopicName}</li>
                                )
                               }
                              
                           })
                       }
                       {
                        seeMore&&props.offBoard&&props.offBoard.map((offItems,index)=>{
                              return(
                                  <li onClick={() => props.onClickLifecycle(offItems, props.offBoardId)}>{offItems.supertopicName}</li>
                              )
                         })
                     }
                      </ul>
                    </div>
                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <button className="btn-primary-outline" onClick={handleSee}>{!seeMore?"See All":"See Less"}</button>
                  </div>
                </div>
              </div>


            </div>


    )
}
export default EmployeeLifeCycle;