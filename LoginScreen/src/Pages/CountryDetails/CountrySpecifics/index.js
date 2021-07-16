import { useEffect, useRef, useState } from "react";
import {} from "../../../utils/utils";
import "./_specifics.scss";
import { getPublicHolidayList } from "../../../Store/reducers/country";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { stripHtml_fun } from "../../../utils/utils";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const tag = "998877";

const severityTypes = {
  CRITICAL: {
    name: "Critical",
    color: "border-maroon",
    bullet: "maroon_bg",
  },
  MAJOR: {
    name: "Major",
    color: "border-yellow",
    bullet: "yellow_bg",
  },
  MINOR: {
    name: "Minor",
    color: "border_blue",
    bullet: "blue_bg",
  },
  OTHER: {
    name: "other",
    color: "border_blue",
    bullet: "",
  },
};

const getSeverity = (type) => {
  let severity;
  for (let key in severityTypes) {
    if (severityTypes[key].name === type) severity = severityTypes[key];
  }
  if (severity) return severity;
  else return severityTypes.OTHER;
};

export default function (props) {
  const { specifics = [], selectedSolution = false } = props;

  const superTopics =
    (specifics && specifics.length && specifics[0]?.superTopicMetadatas) || [];

  const ref = useRef(null);
  const scroll = useRef(null);
  const [active, setActive] = useState();
  const [newSnap, setSnap] = useState();
  const [rightSnap,setRightSnap]=useState()
  const dispatch = useDispatch();
  const holidayList = useSelector(
    (state) => state?.country?.holidayList?.holidays
  );

  let date = new Date();
  var year = date.getFullYear();

  useEffect(() => {
    dispatch(
      getPublicHolidayList({ id: superTopics[0]?.countryId, year: year })
    );
  }, []);

  useEffect(() => {
    if (specifics && specifics.length) {
      const superTopics =
        (specifics && specifics.length && specifics[0]?.superTopicMetadatas) ||
        [];
        let snap=[]
        specifics && specifics.length &&specifics.map((e)=>{
            e.subcategorySettings.map((item)=>{
                e.superTopicMetadatas.map((data)=>{
                    if(item.contenId===data.supertopicContentId){
                        if(!item.isTitleHidden||!item.isContentHidden){
                            snap.push(data)
                        }
                      
                    }
                })
            })
        })
      let snap1=[]
      specifics && specifics.length &&specifics.map((e)=>{
          e.subcategorySettings.map((item)=>{
              e.superTopicMetadatas.map((data)=>{
                  if(item?.contenId===data?.supertopicContentId){
                      if(!item.isTitleHidden&&!item.isContentHidden){
                          snap1.push({
                              alert:data?.alert,
                              supertopicContent:data?.supertopicContent,
                              supertopicName:data?.supertopicName,
                              topics:data?.topics,
                              supertopicId:data?.supertopicId,
                              subcategorySettings:data.subcategorySettings

                          })
                      }
                      if(item.isTitleHidden&&!item.isContentHidden){
                          snap1.push({
                              alert:data?.alert,
                              supertopicContent:data?.supertopicContent,
                              supertopicName:" ",
                              topics:data?.topics,
                              subcategorySettings:data.subcategorySettings,
                              supertopicId:data?.supertopicId
                          })
                      }
                      if(!item.isTitleHidden&&item.isContentHidden){
                          snap1.push({
                              alert:data?.alert,
                              supertopicContent:"",
                              supertopicName:data?.supertopicName,
                              topics:data.topics,
                              subcategorySettings:data.subcategorySettings,
                              supertopicId:data?.supertopicId
                          })
                      }
                      if(item.isTitleHidden&&item.isContentHidden){
                        snap1.push({
                            alert:data?.alert,
                            supertopicContent:"",
                            supertopicName:" ",
                            topics:data.topics,
                            subcategorySettings:data.subcategorySettings,
                            supertopicId:data?.supertopicId
                        })
                    }
                    
                  }
              })
          })
      })
      console.log("speci",snap1)
      setSnap(snap);
      setRightSnap(snap1)
      if (newSnap?.length) {
        setActive(newSnap[0].supertopicId);
      }
    }

    if (selectedSolution) {
      setActive(selectedSolution.supertopicId);
    }
    if (props?.divScroll?.divScroll === "specefics") {
      scroll.current.scrollIntoView();
    }
  }, [specifics]);

  const onTabPaneScroll = (event) => {
    let content = event.target;

    let children = content.children;

    let index = 0,
      topChild;
    for (let child of children) {
      if (index === 7) index++;
      if (child.offsetTop - content.scrollTop < 50) {
        topChild = child;
      }
    }
    if (topChild) setActive(topChild.getAttribute("id"));
  };

  const onSuperTopicClick = (target) => {
    let element = ref.current;
    let targetEl = document.getElementById(target);
    targetEl.scrollIntoView(true);
  };

  return (
    <div className="row specifics-detail" ref={scroll}>
      <div className="col-lg-4 scrollscpy_overflow">
        <ul className="tab-header">
          {newSnap?.map((superTopic, index) => {
            let topics = superTopic.topics;
            return (
              <li
                key={superTopic.supertopicId}
                data-key={superTopic.supertopicId}
                id={superTopic.supertopicContentId}
                className={active === superTopic.supertopicId ? "selected" : ""}
                onClick={(event) => {
                  event.stopPropagation();
                  onSuperTopicClick(superTopic.supertopicId);
                }}
              >
                {superTopic.supertopicName}
                {superTopic.alert ? (
                  <div
                    className={`round ${
                      getSeverity(superTopic.alert?.severityType)?.bullet
                    }`}
                  ></div>
                ) : null}
                {topics.length ? (
                  <ul>
                    {topics.map((topic) => (
                      <li
                        key={topic.topicId}
                        onClick={(event) => {
                          event.stopPropagation();
                          onSuperTopicClick(topic.topicId);
                        }}
                      >
                        {topic.topicName}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-lg-8">
        <div className="tab-content scrollscpy_overflow">
          <div className="scrollspy-para">
            <div className="tab-pane" onScroll={onTabPaneScroll} ref={ref}>
              {rightSnap?.map((superTopic, index) => {
                let topics = superTopic.topics;

                return (
                  <div
                    id={superTopic.supertopicId}
                    key={superTopic.supertopicId}
                    className="col-12"
                  >
                    <h3
                      className={`supertopic-title ${
                        !superTopic.alert ? "pl-0" : ""
                      }`}
                    >
                      {superTopic.supertopicName}
                    </h3>
                    {superTopic.alert ? (
                      <div
                        className={`round ${
                          getSeverity(superTopic.alert?.severityType)?.bullet
                        }`}
                      ></div>
                    ) : null}
                    {superTopic.supertopicName ===
                    "Public Holidays & Annual Leave" ? (
                      <>
                        <table>
                          <tr>
                            <th className="text-left">HOLIDAY</th>
                            <th>{year}</th>
                            <th>{year + 1}</th>
                            <th>CATEGORY</th>
                          </tr>
                          {holidayList && holidayList.length
                            ? holidayList.map((data) => {
                                return (
                                  <>
                                    <tr>
                                      <OverlayTrigger
                                        overlay={(props) => (
                                          <Tooltip
                                            id={`Download-Button`}
                                            {...props}
                                          >
                                            {data.description}
                                          </Tooltip>
                                        )}
                                        placement="left"
                                      >
                                        <td className="text-left"
                                        style={{cursor:"pointer"}}>
                                          {`${stripHtml_fun(
                                            data.description
                                          ).substring(0, 25)}${
                                            data.description?.length > 25
                                              ? "..."
                                              : ""
                                          }`}
                                        </td>
                                      </OverlayTrigger>

                                      <td>
                                        {moment(data?.date).format(
                                          "MMM DD, YYYY"
                                        )}
                                      </td>
                                      <td className="gray-txt-color">
                                        Jun 1, 2021
                                      </td>
                                      <td>Public</td>
                                    </tr>
                                  </>
                                );
                              })
                            : 
                            <tr style={{textAlign:"center"}}><td colSpan={4}> No data found</td></tr>
                           
                            }
                        </table>
                      </>
                    ) : (
                      <div>
                        <p
                          className="text-data"
                          dangerouslySetInnerHTML={{
                            __html: superTopic.supertopicContent,
                          }}
                        />
                        {topics && topics.length
                          ? topics.map((topic) => {
                              let subTopics = topic.subTopics;
                            let newTop= superTopic?.subcategorySettings?.map((top)=>{
                             
                              if(top.contenId===topic.topicContentId){
                                console.log("toppp",topic.topicName)
                              return (
                                <div
                                  key={topic.topicId}
                                  className="col-12"
                                  id={topic.topicId}
                                >
                                  <h3
                                    className={`topic-title ${
                                      !topic.alert ? "pl-0" : ""
                                    }`}
                                  >
                                    {!top.isTitleHidden?topic.topicName:""}
                                  </h3>
                                  {topic.alert ? (
                                    <div
                                      className={`round ${
                                        getSeverity(topic.alert?.severityType)
                                          ?.bullet
                                      }`}
                                    ></div>
                                  ) : null}
                                  <div>
                                    <p
                                      className="text-data"
                                      dangerouslySetInnerHTML={{
                                        __html:!top.isContentHidden?topic.topicContent:"",
                                      }}
                                    />
                                    {subTopics && subTopics.length
                                      ? subTopics.map((subTopic) => {
                                          let terTopics =
                                            subTopic.tertiaryTopics;
                                            let newSub=topic?.subcategorySettings?.map((sub)=>{

                                            if(sub.contenId===subTopic.subTopicContentId){
                                              console.log("sub",subTopic.subTopicName)
                                            
                                          return(
                                            <div
                                              key={subTopic.subTopicId}
                                              className="col-12"
                                            >
                                              <h3
                                                className={`subtopic-title ${
                                                  !subTopic.alert ? "pl-0" : ""
                                                }`}
                                              >
                                                {!sub.isTitleHidden?subTopic.subTopicName:""}
                                              </h3>
                                              {subTopic.alert ? (
                                                <div
                                                  className={`round ${
                                                    getSeverity(
                                                      subTopic.alert
                                                        ?.severityType
                                                    )?.bullet
                                                  }`}
                                                ></div>
                                              ) : null}
                                              <div>
                                                <p
                                                  className="text-data"
                                                  dangerouslySetInnerHTML={{
                                                    __html:
                                                      !sub.isContentHidden?subTopic.subTopicContent:"",
                                                  }}
                                                />
                                                {terTopics && terTopics.length
                                                  ? terTopics.map(
                                                      (terTopic) => {
                                                        let newTer=subTopic?.subcategorySettings?.map((ter)=>{

                                                        if(ter.contenId===terTopic.tertiaryTopicContentId){

                                                        
                                                        return(
                                                        <div
                                                          key={
                                                            terTopic.tertiaryTopicId
                                                          }
                                                          className="col-12"
                                                        >
                                                          <h3
                                                            className={`tertopic-title ${
                                                              !terTopic.alert
                                                                ? "pl-0"
                                                                : ""
                                                            }`}
                                                          >
                                                            {
                                                            !ter.isTitleHidden?terTopic.tertiaryTopicName:""
                                                            }
                                                          </h3>
                                                          {terTopic.alert ? (
                                                            <div
                                                              className={`round ${
                                                                getSeverity(
                                                                  terTopic.alert
                                                                    ?.severityType
                                                                )?.bullet
                                                              }`}
                                                            ></div>
                                                          ) : null}
                                                          <div>
                                                            <p
                                                              className="text-data"
                                                              dangerouslySetInnerHTML={{
                                                                __html:
                                                                 !ter.isContentHidden?terTopic.tertiaryTopicContent:"",
                                                              }}
                                                            />
                                                          </div>
                                                        </div>
                                                      )}}
                                                      )
                                                    return newTer
                                                    }
                                                    )
                                                  : null}
                                              </div>
                                            </div>
                                          );
                                        }})
                                      return newSub
                                      })
                                      : null}
                                  </div>
                                </div>
                              );
                            }})
                          
                          return newTop
                          })
                          : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
